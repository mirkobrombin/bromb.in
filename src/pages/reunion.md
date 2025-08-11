---
title: Counting the Days
description: A gentle countdown to our joyful reunion.
permalink: /reunion/
layout: plain
---

<link href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap" rel="stylesheet">

<style>
body {
  font-family: "Fredoka One", sans-serif;
  background: linear-gradient(-45deg, #ffe6f0, #e1bee7, #f8bbd0, #f48fb1);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  color: #880e4f;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
  text-transform: uppercase;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.hearts {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

#hearts .heart-icon {
  width: 7rem;
  height: 7rem;
  animation: beat 1s infinite;
}

@keyframes beat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.path {
  position: relative;
  flex: 1;
  height: 4px;
  background: linear-gradient(to right, #f8bbd0, #f48fb1);
  margin: 0 1rem;
  border-radius: 2px;
}

.plane {
  position: absolute;
  top: -32px;
  left: 0;
  width: 64px;
  height: 64px;
  transition: left 1s linear;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

#countdown {
  font-size: 2.5rem;
  letter-spacing: 2px;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

@media (max-width: 600px) {
  #hearts .heart-icon { width: 5rem; height: 5rem; }
  .plane { width: 40px; height: 40px; top: -20px; }
  #countdown { font-size: 1.5rem; }
}
</style>

<div id="hearts" class="hearts">
  <img src="/assets/icons/heart.svg" class="heart-icon" alt="heart">
  <div class="path">
    <img id="plane" src="/assets/icons/flight.svg" class="plane" alt="plane">
  </div>
  <img src="/assets/icons/heart.svg" class="heart-icon" alt="heart">
</div>

<div id="countdown"></div>

<script>
const targetDate = new Date('2025-09-17T00:00:00Z');
const start = Date.now();
const total = targetDate - start;
const plane = document.getElementById('plane');
const countdown = document.getElementById('countdown');

function update() {
  const now = Date.now();
  const remaining = targetDate - now;
  const progress = Math.max(0, Math.min(1, (total - remaining) / total));
  plane.style.left = (progress * 100) + '%';

  if (remaining <= 0) {
    countdown.textContent = 'Welcome back!';
    plane.style.left = '100%';
    clearInterval(timer);
    return;
  }

  const seconds = Math.floor(remaining / 1000);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  countdown.textContent = `${days}d ${hours}h ${minutes}m ${secs}s`;
}

update();
const timer = setInterval(update, 1000);
</script>

