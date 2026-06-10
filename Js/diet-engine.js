function generateDiet() {
    var result = document.getElementById("result");

    var ageGroup = document.getElementById("age").value;
    var disease  = document.getElementById("disease").value;
    var gender   = document.getElementById("gender").value;

    var weight = parseFloat(document.getElementById("weight").value);
    var height = parseFloat(document.getElementById("height").value);

    /* ===== محاسبه BMI ===== */
    var bmi         = null;
    var bmiCategory = "normal";
    var bmiValue    = "ثبت نشده";

    if (weight && height) {
        bmi = weight / Math.pow(height / 100, 2);
        bmiValue = bmi.toFixed(1);

        if      (bmi < 18.5) bmiCategory = "underweight";
        else if (bmi < 25)   bmiCategory = "normal";
        else if (bmi < 30)   bmiCategory = "overweight";
        else                 bmiCategory = "obese";
    }

    /* ===== دریافت رژیم از DIET_DATA ===== */
    if (typeof DIET_DATA === "undefined") {
        result.innerHTML =
            "<div class='result-card error'>" +
            "<h3>خطا</h3>" +
            "<p>فایل دیتابیس رژیم بارگذاری نشده است.</p>" +
            "</div>";
        return;
    }

    var dietData = null;

    /* برای حالت سلامت جنسیت بی‌تاثیر است — همیشه male خوانده می‌شود */
    var lookupGender = (disease === "healthy") ? "male" : gender;

    try {
        if (
            DIET_DATA[ageGroup] &&
            DIET_DATA[ageGroup][disease] &&
            DIET_DATA[ageGroup][disease][bmiCategory] &&
            DIET_DATA[ageGroup][disease][bmiCategory][lookupGender]
        ) {
            dietData = DIET_DATA[ageGroup][disease][bmiCategory][lookupGender];
        }
    } catch (e) {
        console.error(e);
    }

    if (!dietData) {
        result.innerHTML =
            "<div class='result-card error'>" +
            "<h3>رژیمی پیدا نشد</h3>" +
            "<p>برای اطلاعات انتخاب شده رژیمی ثبت نشده است.</p>" +
            "</div>";
        return;
    }

    /* ===== ترجمه‌ها ===== */
    var bmiTranslations = {
        underweight: "کمبود وزن",
        normal:      "نرمال",
        overweight:  "اضافه وزن",
        obese:       "چاق"
    };

    var genderTranslations = {
        male:   "مرد",
        female: "زن"
    };

    var ageTranslations = {
        "12-17": "۱۲ تا ۱۷ سال",
        "18-30": "۱۸ تا ۳۰ سال",
        "31-50": "۳۱ تا ۵۰ سال",
        "51-65": "۵۱ تا ۶۵ سال",
        "66+":   "بالای ۶۶ سال"
    };

    var diseaseTranslations = {
        healthy:         "سلامت (بدون بیماری)",
        diabetes:        "دیابت",
        hypertension:    "فشار خون",
        highcholesterol: "چربی خون"
    };

    var bmiStatusTranslations = {
        underweight: "کمبود وزن",
        normal:      "وزن نرمال",
        overweight:  "اضافه وزن",
        obese:       "چاقی"
    };

    var bmiAdvice = {
        underweight: "بهتر است رژیم غذایی مقوی و پرکالری‌تری داشته باشید.",
        normal:      "وضعیت بدنی شما مناسب است و بهتر است سبک زندگی سالم را ادامه دهید.",
        overweight:  "فعالیت بدنی بیشتر و کنترل تغذیه توصیه می‌شود.",
        obese:       "بهتر است رژیم غذایی کنترل‌شده و برنامه ورزشی منظم داشته باشید."
    };

    var menuA = dietData.menuA || {};
    var menuB = dietData.menuB || {};
    var menuC = dietData.menuC || {};

    var html = "";

    /* ===== کارت اطلاعات کاربر ===== */
   html += "<div class='result-card user-info-card'>";
html += "<h2><img src='image/user.png' class='title-icon'>اطلاعات کاربر</h2>";

html += "<p class='info-row'><strong>گروه سنی:</strong> " +
(ageTranslations[ageGroup] || ageGroup) + "</p>";

html += "<p class='info-row'><strong>جنسیت:</strong> " +
(genderTranslations[gender] || gender) + "</p>";

html += "<p class='info-row'><strong>" +
(disease === "healthy" ? "وضعیت" : "بیماری") +
":</strong> " +
(diseaseTranslations[disease] || disease) + "</p>";

html += "</div>";

    /* ===== کارت BMI با ساختار دایره رنگی پویا ===== */
    if (bmi !== null) {
        html += "<div class='result-card'>";
        html += "<h2><img src='image/bmi.png' class='title-icon'>تحلیل BMI</h2>";
        
        html += "<div class='bmi-circle-container'>";
        html += "  <div class='bmi-circle " + bmiCategory + "'>";
        html += "    <span class='bmi-value'>" + bmiValue + "</span>";
        html += "    <span class='bmi-label'>شاخص BMI</span>";
        html += "  </div>";
        html += "</div>";
        
        html += "<div class='bmi-status-wrapper'>";
        html += "  <p class='bmi-status-title'>وضعیت: <strong>" + (bmiStatusTranslations[bmiCategory] || bmiCategory) + "</strong></p>";
        html += "  <p class='bmi-status-desc'>" + (bmiAdvice[bmiCategory] || "") + "</p>";
        html += "</div>";
        
        html += "</div>";
    }

    /* ===== کارت هدف رژیم ===== */
    html += "<div class='result-card goal-card' >";
    html += "<h2><img src='image/check.png' class='title-icon'>هدف رژیم</h2>";
    html += "<p>" + (dietData.goal || "تعریف نشده") + "</p>";
    html += "</div>";

    /* ===== کارت اصلی رژیم همراه با دکمه‌های سوییچ منو ===== */
    /* ===== کارت اصلی رژیم (هم‌اندازه و هم‌عرض با ساختار باکس‌های بالا) ===== */
  /* ===== کارت اصلی رژیم همراه با دکمه‌های سوییچ منو ===== */
    html += "<div class='result-card full-width-card'>";
    html += "  <div class='menu-header-wrapper'>";
    html += "    <h2><img src='image/todo.png' class='title-icon'>برنامه غذایی روزانه</h2>";
    html += "    <div class='menu-buttons-container'>";
    html += "      <button type='button' class='menu-tab-btn active' onclick='switchDietMenu(this, \"menu-a-content\")'>منو A</button>";
    html += "      <button type='button' class='menu-tab-btn' onclick='switchDietMenu(this, \"menu-b-content\")'>منو B</button>";
    html += "      <button type='button' class='menu-tab-btn' onclick='switchDietMenu(this, \"menu-c-content\")'>منو C</button>";
    html += "    </div>";
    html += "  </div>";

    html += "  <div class='menu-contents-wrapper'>";

    // ۱. محتوای منو A
    html += "    <div id='menu-a-content' class='diet-tab-content active-content'>";
    html += "      <div class='meals-horizontal-container'>";
    html += "        <div class='meal-column-box breakfast-box'><img src='image/breakfast.png' class='meal-img-top' alt='صبحانه' onerror=\"this.src='https://cdn-icons-png.flaticon.com/512/5087/5087379.png'\"><div class='meal-text'><strong>صبحانه</strong><p>" + (menuA.breakfast || "ثبت نشده") + "</p></div></div>";
    html += "        <div class='meal-column-box lunch-box'><img src='image/lunch.png' class='meal-img-top' alt='ناهار' onerror=\"this.src='https://cdn-icons-png.flaticon.com/512/2082/2082045.png'\"><div class='meal-text'><strong>ناهار</strong><p>" + (menuA.lunch || "ثبت نشده") + "</p></div></div>";
    html += "        <div class='meal-column-box dinner-box'><img src='image/dinner.png' class='meal-img-top' alt='شام' onerror=\"this.src='https://cdn-icons-png.flaticon.com/512/3306/3306612.png'\"><div class='meal-text'><strong>شام</strong><p>" + (menuA.dinner || "ثبت نشده") + "</p></div></div>";
    html += "      </div>";
    html += "    </div>";

    // ۲. محتوای منو B
    html += "    <div id='menu-b-content' class='diet-tab-content'>";
    html += "      <div class='meals-horizontal-container'>";
    html += "        <div class='meal-column-box breakfast-box'><img src='image/breakfast.png' class='meal-img-top' alt='صبحانه' onerror=\"this.src='https://cdn-icons-png.flaticon.com/512/5087/5087379.png'\"><div class='meal-text'><strong>صبحانه</strong><p>" + (menuB.breakfast || "ثبت نشده") + "</p></div></div>";
    html += "        <div class='meal-column-box lunch-box'><img src='image/lunch.png' class='meal-img-top' alt='ناهار' onerror=\"this.src='https://cdn-icons-png.flaticon.com/512/2082/2082045.png'\"><div class='meal-text'><strong>ناهار</strong><p>" + (menuB.lunch || "ثبت نشده") + "</p></div></div>";
    html += "        <div class='meal-column-box dinner-box'><img src='image/dinner.png' class='meal-img-top' alt='شام' onerror=\"this.src='https://cdn-icons-png.flaticon.com/512/3306/3306612.png'\"><div class='meal-text'><strong>شام</strong><p>" + (menuB.dinner || "ثبت نشده") + "</p></div></div>";
    html += "      </div>";
    html += "    </div>";

    // ۳. محتوای منو C
    html += "    <div id='menu-c-content' class='diet-tab-content'>";
    html += "      <div class='meals-horizontal-container'>";
    html += "        <div class='meal-column-box breakfast-box'><img src='image/breakfast.png' class='meal-img-top' alt='صبحانه' onerror=\"this.src='https://cdn-icons-png.flaticon.com/512/5087/5087379.png'\"><div class='meal-text'><strong>صبحانه</strong><p>" + (menuC.breakfast || "ثبت نشده") + "</p></div></div>";
    html += "        <div class='meal-column-box lunch-box'><img src='image/lunch.png' class='meal-img-top' alt='ناهار' onerror=\"this.src='https://cdn-icons-png.flaticon.com/512/2082/2082045.png'\"><div class='meal-text'><strong>ناهار</strong><p>" + (menuC.lunch || "ثبت نشده") + "</p></div></div>";
    html += "        <div class='meal-column-box dinner-box'><img src='image/dinner.png' class='meal-img-top' alt='شام' onerror=\"this.src='https://cdn-icons-png.flaticon.com/512/3306/3306612.png'\"><div class='meal-text'><strong>شام</strong><p>" + (menuC.dinner || "ثبت نشده") + "</p></div></div>";
    html += "      </div>";
    html += "    </div>";

    html += "  </div>"; 
    html += "</div>"; 

    result.innerHTML = html;
}

/* ===== تابع کمکی برای سوییچ کردن منوها با کلیک کاربر ===== */
/* ===== تابع کمکی برای سوییچ کردن منوها با کلیک کاربر ===== */
function switchDietMenu(buttonElement, contentId) {
    // ۱. غیرفعال کردن تمام دکمه‌ها در این باکس
    var buttons = buttonElement.parentElement.getElementsByClassName('menu-tab-btn');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    // فعال کردن دکمه کلیک شده
    buttonElement.classList.add('active');

    // ۲. پیدا کردن کارت اصلی و مخفی کردن تمام محتواهای رژیم درون آن
    var parentCard = buttonElement.closest('.result-card');
    var contents = parentCard.getElementsByClassName('diet-tab-content');
    for (var j = 0; j < contents.length; j++) {
        contents[j].classList.remove('active-content');
        contents[j].style.display = 'none'; // اطمینان از مخفی شدن
    }
    
    // ۳. نمایش محتوای منوی انتخاب شده
    var targetContent = parentCard.querySelector('#' + contentId);
    if (targetContent) {
        targetContent.classList.add('active-content');
        targetContent.style.display = 'block'; // اطمینان از نمایش
    }
}