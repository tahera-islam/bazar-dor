// ১. English সংখ্যা বাংলায় রূপান্তর
export const toBengaliNumber = (num) => {
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";

  return String(num).replace(/[0-9]/g, (digit) => {
    return bengaliDigits[Number(digit)];
  });
};


// ২. বাংলা সংখ্যা English সংখ্যায় রূপান্তর
// Sorting-এর জন্য ব্যবহার হবে
export const toEnglishNumber = (str) => {
  const bengaliDigits = "০১২৩৪৫৬৭৮৯";
  const englishDigits = "0123456789";

  const converted = String(str).replace(/[০-৯]/g, (digit) => {
    return englishDigits[bengaliDigits.indexOf(digit)];
  });

  return parseFloat(converted);
};


// ৩. দাম ফরম্যাট করা
// উদাহরণ: 1850 → ১,৮৫০
export const formatPrice = (price) => {
  const formattedPrice = Number(price).toLocaleString("en-IN");

  return toBengaliNumber(formattedPrice);
};


// ৪. Unit বাংলায় রূপান্তর
export const getUnitBn = (unit) => {
  const unitMap = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };

  return unitMap[unit] || unit;
};


// ৫. আজকের বাংলা তারিখ
export const getBanglaDate = () => {
  return new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
};