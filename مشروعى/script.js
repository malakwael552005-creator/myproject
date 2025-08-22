// 🔊 الأصوات
const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");
const cheerSound = new Audio("cheer.mp3");

const questions = {
  arithmetic: [
    { q: "5 + 3 = ؟", options: ["6", "7", "8", "9"], correct: "8", explanation: "5 + 3 = 8" },
    { q: "12 - 7 = ؟", options: ["4", "5", "6", "7"], correct: "5", explanation: "12 - 7 = 5" },
    { q: "4 × 6 = ؟", options: ["12", "18", "20", "24"], correct: "24", explanation: "4 × 6 = 24" },
    { q: "20 ÷ 4 = ؟", options: ["4", "5", "6", "7"], correct: "5", explanation: "20 ÷ 4 = 5" }
  ],
  geometry: [
    { q: "كم عدد أضلاع المربع؟", options: ["3", "4", "5", "6"], correct: "4", explanation: "المربع له 4 أضلاع." },
    { q: "الشكل الذي له 3 أضلاع يسمى؟", options: ["مربع", "مثلث", "خماسي", "دائرة"], correct: "مثلث", explanation: "الشكل بثلاثة أضلاع هو مثلث." }
  ],
  fractions: [
    { q: "½ + ½ = ؟", options: ["1", "2", "½", "0"], correct: "1", explanation: "نصف + نصف = واحد صحيح." },
    { q: "¾ - ¼ = ؟", options: ["½", "¼", "1", "0"], correct: "½", explanation: "¾ - ¼ = ½." }
  ],
  percentages: [
    { q: "ما هي 50% من 100؟", options: ["20", "50", "60", "80"], correct: "50", explanation: "50% من 100 = 50." },
    { q: "20% من 200 = ؟", options: ["20", "30", "40", "50"], correct: "40", explanation: "20% من 200 = 40." }
  ],
  wordproblems: [
    { q: "مع ملك 5 تفاحات وأعطت 2 لصديقتها. كم تبقى معها؟", options: ["2", "3", "4", "5"], correct: "3", explanation: "5 - 2 = 3." },
    { q: "قطار به 10 عربات، كل عربة بها 20 راكب. كم عدد الركاب الكلي؟", options: ["100", "150", "200", "250"], correct: "200", explanation: "10 × 20 = 200." }
  ]
};

// تحميل الأسئلة
function loadQuestions(type) {
  let quizDiv = document.getElementById("quiz");
  let feedback = document.getElementById("feedback");
  quizDiv.innerHTML = "";
  feedback.innerHTML = "";

  const list = type === "random" 
    ? Object.values(questions).flat() 
    : questions[type];
  
  const q = list[Math.floor(Math.random() * list.length)];

  let qElem = document.createElement("h2");
  qElem.textContent = q.q;
  quizDiv.appendChild(qElem);

  q.options.forEach(opt => {
    let btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt, q.correct, q.explanation, type);
    quizDiv.appendChild(btn);
  });
}

// التحقق من الإجابة
function checkAnswer(selected, correct, explanation, type) {
  let feedback = document.getElementById("feedback");
  if (selected === correct) {
    feedback.innerHTML = `<p class="success">👏 برافو! إجابة صحيحة 🎉</p>`;
    correctSound.play();
    launchStars();
  } else {
    feedback.innerHTML = `
      <p class="fail">❌ إجابة غير صحيحة</p>
      <p class="answer">الإجابة الصحيحة: <strong>${correct}</strong></p>
      <p class="explain">${explanation}</p>
    `;
    wrongSound.play();
  }
  setTimeout(() => loadQuestions(type), 700);
}

// 🌟 نجوم متطايرة
function launchStars() {
  const canvas = document.getElementById("starCanvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let stars = [];
  for (let i = 0; i < 30; i++) {
    stars.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      size: Math.random() * 5 + 2,
      speedX: (Math.random() - 0.5) * 6,
      speedY: (Math.random() - 0.5) * 6,
      alpha: 1
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
      ctx.globalAlpha = star.alpha;
      ctx.fillStyle = "yellow";
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();

      star.x += star.speedX;
      star.y += star.speedY;
      star.alpha -= 0.02;
    });
    stars = stars.filter(s => s.alpha > 0);
    if (stars.length > 0) requestAnimationFrame(animate);
  }
  animate();
}



