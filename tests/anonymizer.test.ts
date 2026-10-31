import { describe, expect, it } from "vitest";
import {
  anonymizeReceiptForIndex,
  classifyReceiptItemCategory,
  cleanDishName,
  sanitizePiiText,
} from "../src/domain/anonymizer.js";

describe("GDPR & PII Anonymization Pipeline (anonymizer.ts)", () => {
  it("strips Russian and English personal names & assignment tags from dish descriptions", () => {
    expect(cleanDishName("Стейк Рибай (для Саши)", ["Саша", "Маша"])).toBe(
      "Стейк Рибай"
    );
    expect(cleanDishName("Маша: Латте на овсяном", ["Саша", "Маша"])).toBe(
      "Латте на овсяном"
    );
    expect(cleanDishName("Shakshuka [for Alex] @alex_tlv", ["Alex"])).toBe(
      "Shakshuka"
    );
    expect(
      cleanDishName("2 x Goldstar Beer - Зоар", ["Зоар", "Даниэль"])
    ).toBe("Goldstar Beer");
  });

  it("preserves culinary dish names containing proper nouns (Маргарита, Цезарь, Анна Павлова)", () => {
    expect(cleanDishName("Пицца Маргарита (для Маши)", ["Маша"])).toBe(
      "Пицца Маргарита"
    );
    expect(cleanDishName("Салат Цезарь с креветками — Саша", ["Саша"])).toBe(
      "Салат Цезарь с креветками"
    );
    expect(cleanDishName("Десерт Анна Павлова (Анна)", ["Анна"])).toBe(
      "Десерт Анна Павлова"
    );
  });

  it("scrubs credit card PANs, masked cards, Russian fiscal markers (ФН/ФД/ФП/ИНН/КПП), phones, and emails", () => {
    const dirtyText = [
      "Ресторан Вкус",
      "ИНН: 7707083893 КПП 770701001",
      "Кассир: Иванова Анна Сергеевна",
      "ФН 9960440300123456 ФД 104928 ФП 3849201928",
      "Карта: 4276 3800 1234 5678 RRN: 003948192012",
      "PAN **** **** **** 9012",
      "Тел: +7 (999) 123-45-67 email: receipt@client-mail.ru",
      "ע.מ. 514928374",
    ].join(" | ");

    const scrubbed = sanitizePiiText(dirtyText);

    expect(scrubbed).not.toContain("7707083893");
    expect(scrubbed).not.toContain("770701001");
    expect(scrubbed).not.toContain("9960440300123456");
    expect(scrubbed).not.toContain("104928");
    expect(scrubbed).not.toContain("3849201928");
    expect(scrubbed).not.toContain("4276 3800 1234 5678");
    expect(scrubbed).not.toContain("9012");
    expect(scrubbed).not.toContain("Иванова");
    expect(scrubbed).not.toContain("123-45-67");
    expect(scrubbed).not.toContain("receipt@client-mail.ru");
    expect(scrubbed).not.toContain("514928374");
    expect(scrubbed).toContain("Ресторан Вкус");
  });

  it("outputs strictly sanitized dish records with BigInt price_cents and exact DB categories", () => {
    const records = anonymizeReceiptForIndex({
      restaurant_name: "Hummus Cafe ИНН 7701234567",
      geo_location: { lat: 32.0622189, lng: 34.7715892 },
      currency: "ils",
      participant_names: ["Саша", "Маша", "Noa"],
      items: [
        { item_name: "1. Classic Shakshuka (для Саши)", price: 54.5 },
        { item_name: "Lemonade with Mint [Noa]", price: 18 },
        { item_name: "Malabi Dessert - Маша", price: 28 },
        { item_name: "Israeli Salad", price: 32 },
      ],
    });

    expect(records).toHaveLength(4);

    expect(records[0]).toEqual({
      restaurant_name: "Hummus Cafe",
      geo_location: { lat: 32.0622, lng: 34.7716 },
      item_name_clean: "Classic Shakshuka",
      category: "mains",
      price_cents: 5450n,
      currency: "ILS",
    });

    expect(records[1]?.category).toBe("drinks");
    expect(records[1]?.item_name_clean).toBe("Lemonade with Mint");
    expect(records[1]?.price_cents).toBe(1800n);

    expect(records[2]?.category).toBe("desserts");
    expect(records[2]?.item_name_clean).toBe("Malabi Dessert");

    expect(records[3]?.category).toBe("starters");
    expect(classifyReceiptItemCategory("Bruschetta")).toBe("starters");
  });
});

