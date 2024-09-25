document.getElementById("calculate-btn").addEventListener("click", function() {
    // Show loading animation
    const resultsDiv = document.getElementById("results");
    resultsDiv.style.display = "none";
    const loadingText = document.createElement("p");
    loadingText.textContent = "جاري الحساب...";
    resultsDiv.appendChild(loadingText);
    resultsDiv.style.display = "block";

    setTimeout(() => {
        const age = parseInt(document.getElementById("age").value);
        const gender = document.getElementById("gender").value;
        const weight = parseFloat(document.getElementById("weight").value);
        const height = parseFloat(document.getElementById("height").value);
        const activity = document.getElementById("activity").value;
        const goal = document.getElementById("goal").value;

        // حساب السعرات الحرارية اليومية المطلوبة
        let bmr;
        if (gender === "male") {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
        } else {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
        }

        let activityMultiplier;
        switch (activity) {
            case "sedentary":
                activityMultiplier = 1.2;
                break;
            case "light":
                activityMultiplier = 1.375;
                break;
            case "moderate":
                activityMultiplier = 1.55;
                break;
            case "active":
                activityMultiplier = 1.725;
                break;
            case "intense":
                activityMultiplier = 1.9;
                break;
        }

        let calories = bmr * activityMultiplier;

        // تعديل السعرات حسب الهدف
        if (goal === "lose") {
            calories -= 500; // خسارة الوزن
        } else if (goal === "gain") {
            calories += 500; // زيادة الوزن
        }

        // حساب الماكروز
        const protein = (calories * 0.30) / 4; // 30%
        const carbs = (calories * 0.50) / 4;   // 50%
        const fats = (calories * 0.20) / 9;     // 20%

        // عرض النتائج
        resultsDiv.innerHTML = `
            <h2>نتائجك:</h2>
            <p>السعرات الحرارية اليومية المطلوبة: ${Math.round(calories)} سعرة حرارية</p>
            <p>البروتين: ${Math.round(protein)} جرام</p>
            <p>الكربوهيدرات: ${Math.round(carbs)} جرام</p>
            <p>الدهون: ${Math.round(fats)} جرام</p>
        `;
    }, 3000); // 3 ثواني للانتظار
});