// import helpers from "@/plugins/helpers";
export function myMixin() {
  function showAlert(message) {
    alert(message);
  }
  function changePriceLastThreeDigits(price) {
    const roundedPrice = Math.floor(price / 1000) * 1000;
    return roundedPrice;
  }
  function copyToClipboard(text) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        // helpers.showAlert("متن مورد نظر کپی شد.", "موفق", "success");
        alert("متن مورد نظر کپی شد.");
      })
      .catch((error) => {
        console.error("Failed to copy text:", error);
      });
  }
  const FormatNumber3Digit = (number) => {
    let formattedAmount = number.replace(/[^0-9]/g, "");
    return formattedAmount;
  };
  const changeToArray = (inObject, inArray) => {
    Object.keys(inObject).forEach((element, idx) => {
      let el = {};
      el = { ...inObject[element] };
      el.element_id = element;
      inArray.push(el);
    });
  };

  return {
    FormatNumber3Digit,
    showAlert,
    copyToClipboard,
    changeToArray,
    changePriceLastThreeDigits,
  };
}
