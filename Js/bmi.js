document.addEventListener("DOMContentLoaded", function() {

    // ==========================================================================
    // ۱. مدیریت دکمه‌های صفحه اصلی (Index)
    // ==========================================================================
    const dietButton = document.getElementById("btn-diet");
    const bmiButton = document.getElementById("btn-bmi");

    if (dietButton) {
        dietButton.addEventListener("click", function() {
            window.location.href = "diet.html"; 
        });
    }

    if (bmiButton) {
        bmiButton.addEventListener("click", function() {
            window.location.href = "bmi.html"; 
        });
    }

    // ==========================================================================
    // ۲. مدیریت صفحه BMI
    // ==========================================================================
    
    // الف) انتخاب جنسیت
    const genderBoxes = document.querySelectorAll(".gender-box");
    if (genderBoxes.length > 0) {
        genderBoxes.forEach(box => {
            box.addEventListener("click", function() {
                genderBoxes.forEach(b => b.classList.remove("active"));
                this.classList.add("active");
            });
        });
    }

    // ب) محاسبه BMI
    const btnCalculate = document.getElementById("btn-page-calculate");
    
    if (btnCalculate) {
        btnCalculate.addEventListener("click", function() {
            // خواندن اینپوت‌ها
            const weight = parseFloat(document.getElementById("page-weight").value);
            const heightCm = parseFloat(document.getElementById("page-height").value);
            const age = parseFloat(document.getElementById("page-age").value);
            
            // شرط سنی ۱۷ سال
            if (!age || age < 17) {
                alert("این محاسبه‌گر برای افراد بالای ۱۷ سال طراحی شده است.");
                return;
            }

            // اعتبارسنجی مقادیر
            if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
                alert("لطفاً وزن و قد را به درستی وارد کنید.");
                return;
            }

            // فرمول محاسبه
            const heightM = heightCm / 100;
            const bmi = (weight / (heightM * heightM)).toFixed(1);

            // المان‌های نتیجه
            const resultBox = document.getElementById("page-bmi-result");
            const bmiValueEl = document.getElementById("page-bmi-value");
            const bmiStatusEl = document.getElementById("page-bmi-status");
            const bmiAdviceEl = document.getElementById("page-bmi-advice");
            const badgeStatus = document.getElementById("bmi-badge-status");
            const bmiCircle = document.querySelector(".bmi-circle");

            // تعیین وضعیت و رنگ‌ها
            let status = "";
            let advice = "";
            let colorClass = "";
            let hexColor = "";

            if (bmi < 18.5) {
                status = "کمبود وزن";
                advice = "شاخص شما پایین‌تر از حد نرمال است. پیشنهاد می‌کنیم برای تغذیه سالم با متخصص مشورت کنید.";
                colorClass = "bg-underweight";
                hexColor = "#3498db";
            } else if (bmi < 25) {
                status = "وزن طبیعی";
                advice = "تبریک! وضعیت فیزیکی شما ایده‌آل است. با سبک زندگی فعلی آن را حفظ کنید.";
                colorClass = "bg-normal";
                hexColor = "#2ecc71";
            } else if (bmi < 30) {
                status = "اضافه وزن";
                advice = "شما در محدوده اضافه وزن هستید. با افزایش فعالیت بدنی و تغذیه سالم می‌توانید به وزن ایده‌آل برسید.";
                colorClass = "bg-overweight";
                hexColor = "#e67e22";
            } else {
                status = "چاقی";
                advice = "شاخص توده بدنی شما بالا است. دریافت یک برنامه رژیم غذایی علمی و اصولی به شما توصیه می‌شود.";
                colorClass = "bg-obese";
                hexColor = "#e74c3c";
            }

            // تزریق نتایج به صفحه
            if (bmiValueEl) bmiValueEl.innerText = bmi;
            if (bmiStatusEl) bmiStatusEl.innerText = status;
            if (bmiAdviceEl) bmiAdviceEl.innerText = advice;
            
            // تغییر استایل دایره و بج (با کلاس CSS و استایل مستقیم)
            if (badgeStatus) {
                badgeStatus.className = "status-badge " + colorClass;
                badgeStatus.innerText = status;
            }
            if (bmiCircle) {
                bmiCircle.style.borderColor = hexColor;
            }

            // نمایش باکس نتیجه
            if (resultBox) {
                resultBox.style.display = "flex";
            }
        });
    }
});