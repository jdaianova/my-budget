const btnCalculate = document.querySelector('.btn-calculate');
const manageAgain = document.querySelector('.footer');

manageAgain.onclick = () => {
    location.reload();
};

btnCalculate.onclick = (e) => {
    const myIncome = document.querySelector('#myIncome').value;
    const moneySaved = document.querySelector('#money-saved-selected').value;
    const moneyForWishes = document.querySelector('#wishes-selected').value;
    const personalSection = document.querySelector('#personalSection').value;
    e.preventDefault();
    if (isAllFiledsCorrect()) {
        showCalcuiated();
    };

    //-------------functions--------------//

    function isAllFiledsCorrect() {
        if (moneySaved == -1 || moneyForWishes == -1 || myIncome === "" || personalSection === '' || moneySaved === "" || moneyForWishes === "") {
            popup("all fields must be filled in");
            return false;
        } else if (Number(moneySaved) + Number(moneyForWishes) > 0.5) {
            popup("cannot be more than 100% for all expenses");
            return false;
        } else {
            return true
        };
    }

    function showCalcuiated() {
        //basic needs
        createTotalInfo(Number(myIncome) / 2, 'basic needs', '.basic-needs-info');

        //saved money
        let totalSavedMoney = Number(myIncome) * moneySaved;
        createTotalInfo(totalSavedMoney, 'saved money', '.money-saved-info');

        //money for other
        let totalForWishes = Number(myIncome) * moneyForWishes;
        createTotalInfo(totalForWishes, 'wishes, other', '.wishes-info');

        //rest money
        let totalRestMoney = Number(myIncome) / 2 - totalSavedMoney - totalForWishes;
        createTotalInfo(totalRestMoney, personalSection, '.personal-info')
    }

    function createTotalInfo(totalMoney, totalText, selectorInfo) {
        const parentTotalInfo = document.querySelector(selectorInfo).nextElementSibling;
        const childs = parentTotalInfo.children;
        document.querySelector(selectorInfo).classList.add('invisible-hidden');
        parentTotalInfo.classList.remove('invisible-hidden');
        childs[0].textContent = `${totalMoney.toFixed(2)}$`;
        childs[1].textContent = totalText;
    }

    function popup(text) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: text,
            confirmButtonColor: "#022335",

        })
    }

};