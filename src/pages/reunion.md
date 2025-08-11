---
title: Counting the Days
description: A gentle countdown to our joyful reunion.
permalink: /reunion/
layout: plain
---

<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet">

<style>
body {
  font-family: "Roboto", sans-serif;
  background: #ffe6f0;
  color: #880e4f;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}
.hearts {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  margin-bottom: 2rem;
}
#hearts .heart-icon {
  font-size: 6rem;
  color: #e91e63;
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
  font-size: 64px;
  color: #d81b60;
  transition: left 1s linear;
}
#countdown {
  font-size: 1.25rem;
}
@media (max-width: 600px) {
  #hearts .heart-icon { font-size: 4rem; }
  .plane { font-size: 40px; top: -20px; }
}
</style>

<div id="hearts" class="hearts">
  <span class="material-symbols-outlined heart-icon">favorite</span>
  <div class="path">
    <span id="plane" class="material-symbols-outlined plane">flight</span>
  </div>
  <span class="material-symbols-outlined heart-icon">favorite</span>
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

