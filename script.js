const allCourses = [
      { courseName: '', courseCode: '', timeSlot: '09:00 - 12:00', day: 'Monday', color: '' },
      { courseName: '', courseCode: '', timeSlot: '01:00 - 04:00', day: 'Monday', color: '' },
      { courseName: '', courseCode: '', timeSlot: '04:00 - 07:00', day: 'Monday', color: '' },
      { courseName: '', courseCode: '', timeSlot: '01:00 - 04:00', day: 'Tuesday', color: '' },
      { courseName: '', courseCode: '', timeSlot: '09:00 - 12:00', day: 'Wednesday', color: '' },
      { courseName: '', courseCode: '', timeSlot: '10:00 - 12:00', day: 'Friday', color: '' },
      { courseName: '', courseCode: '', timeSlot: '01:00 - 03:00', day: 'Friday', color: '' },
      { courseName: '', courseCode: '', timeSlot: '04:00 - 07:00', day: 'Friday', color: '' },

      { courseName: 'Data Structure (IT 200)', courseCode: 'BSIT 211-B', timeSlot: '09:00 - 12:00', day: 'Monday', color: 'grey' },
      { courseName: 'Object Oriented Programming (IT 403)', courseCode: 'BSIT 211-B', timeSlot: '01:00 - 04:00', day: 'Monday', color: 'purple' }, 
      { courseName: 'Foreign Language (FL 1)', courseCode: 'BSIT 211-B', timeSlot: '04:00 - 07:00', day: 'Monday', color: 'orange' },
      { courseName: 'Basic Networking (IT 200)', courseCode: 'BSIT 211-B', timeSlot: '01:00 - 04:00', day: 'Tuesday', color: 'pink' },
      { courseName: 'Design & Implementation of Programming (IT 105)', courseCode: 'BSIT 211-B', timeSlot: '09:00 - 12:00', day: 'Wednesday', color: 'green' },
      { courseName: 'P.E 3', courseCode: 'BSIT 211-B', timeSlot: '10:00 - 12:00', day: 'Friday', color: 'orange' },
      { courseName: 'Olivarian 103', courseCode: 'BSIT 211-B', timeSlot: '01:00 - 03:00', day: 'Friday', color: 'blue' },
      { courseName: 'Logic and Critical Thinking (MC 4)', courseCode: 'BSIT 211-B', timeSlot: '04:00 - 07:00', day: 'Friday', color: 'red' },
    ];

const announcements = [
  { title: 'Class Suspended', body: 'Due to weather, there will be no in-person classes on 22/10/25. Online class may be conducted.' },
  { title: 'Midterm Week', body: 'Finals exams will be on December 1-6.' },
  { title: 'New Year', body: 'Happy New Year 2026!' }
];

// --- 2. OFFICE PAGES DATA ---

const officeData = {
  saso: {
    title: "📣 SASO Announcements",
    theme: "saso",
    content: `
      <!-- IMAGE EXAMPLE 1: Banner at top -->
      <!-- <img src="saso-banner.jpg" alt="SASO Event" class="office-banner"> -->

      <h3>Student Organization Activities</h3>
      <div class="announcements">
        <div class="item"><strong>Club Registration</strong><div class="text">Club fair starts next Monday at the Gymnasium.</div></div>
        <div class="item"><strong>Officer Meeting</strong><div class="text">All organization presidents must attend the meeting on Friday, 3PM.</div></div>
      </div>
    `
  },
  bookstore: {
    title: "📚 Bookstore Updates",
    theme: "bookstore",
    content: `
      <!-- IMAGE EXAMPLE 2: Banner at top -->
      <!-- <img src="bookstore-promo.jpg" alt="Bookstore Sale" class="office-banner"> -->

      <h3>Inventory Status</h3>
      <ul style="line-height: 1.8;">
        <li>✅ BSIT Uniforms (Sizes S-XL) - <strong>Available</strong></li>
        <li>✅ Laboratory Manuals (IT 200) - <strong>Available</strong></li>
        <li>✅ID Lanyards - <strong>Out of Stock</strong> (Restock: Nov 25)</li>
      </ul>
      <hr>
      <p><em>Operating Hours: 8:00 AM - 5:00 PM (Mon-Fri)</em></p>
    `
  },
  registrar: {
    title: "📝 Registrar Office",
    theme: "registrar",
    content: `
      <!-- IMAGE EXAMPLE 3: Banner at top -->
      <!-- <img src="registrar-schedule.jpg" alt="Schedule" class="office-banner"> -->

      <h3>Document Requests</h3>
      <p>Request for Transcript of Records (TOR) usually takes 3-5 working days.</p>
      <div class="announcements">
        <div class="item border-registrar">
          <strong>Deadline for Dropping</strong>
          <div class="text">The last day to officially drop subjects is October 30.</div>
        </div>
      </div>
    `
  },
  accounting: {
    title: "💰 Accounting Office",
    theme: "accounting",
    content: `
      <h3>Tuition & Fees</h3>
      <div class="item box-accounting">
        <strong>Midterm Exam Permits</strong><br>
        Please settle your balances to receive your examination permit.
      </div>
      <br>
      <h4>Modes of Payment:</h4>
      <ul>
        <li>Window 1 (Cashier)</li>
        <li>Bank Transfer (BDO / BPI)</li>
        <li>GCash</li>
      </ul>
      
      <!-- IMAGE EXAMPLE 4: QR Code at bottom -->
      <!-- <div style="text-align:center; margin-top:20px;">
           <img src="gcash-qr.png" alt="GCash QR" style="width:150px; border-radius:8px;">
           <p><small>Scan to Pay</small></p>
      </div> -->
    `
  }
};

// --- 3. RENDERING FUNCTIONS ---
document.addEventListener('DOMContentLoaded', () => {
  renderSchedule(allCourses);
  renderAnnouncements();
  renderCalendar();
  
  // Search Logic
  const searchInput = document.getElementById('course-search');
  if(searchInput){
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase();
      renderSchedule(allCourses.filter(c => 
        c.courseName.toLowerCase().includes(q) || c.courseCode.toLowerCase().includes(q)
      ));
    });
  }
});

// Render Main Schedule
function renderSchedule(filtered) {
  const grid = document.getElementById('schedule-grid');
  if(!grid) return;

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const slots = ['09:00 - 12:00', '10:00 - 12:00', '01:00 - 03:00', '01:00 - 04:00', '04:00 - 06:00', '04:00 - 07:00'];
  
  // Reset grid (keep header)
  while (grid.children.length > 1) grid.removeChild(grid.lastChild);

  slots.forEach((slot) => {
    const row = document.createElement('div');
    row.className = 'grid-row';
    row.setAttribute('role', 'row');
    
    // Time Label
    const timeCell = document.createElement('div');
    timeCell.className = 'cell day-label';
    timeCell.textContent = slot;
    row.appendChild(timeCell);

    days.forEach((day) => {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.setAttribute('role', 'gridcell');
      
      const course = filtered.find(c => c.day === day && c.timeSlot === slot);
      if (course) {
        const block = document.createElement('div');
        block.className = `course-block ${course.color}`;
        block.innerHTML = `<strong>${course.courseName}</strong><br/><span>${course.courseCode}</span>`;
        cell.appendChild(block);
      }
      row.appendChild(cell);
    });
    grid.appendChild(row);
  });
}

// Render Main Announcements
function renderAnnouncements() {
  const list = document.getElementById('announcement-list');
  if(list) {
    list.innerHTML = announcements.map(a => 
      `<div class="item"><strong>${a.title}</strong><div class="text">${a.body}</div></div>`
    ).join('');
  }
}

// --- 4. NAVIGATION LOGIC ---

// Switch to Main Dashboard
function showDashboard() {
  const dashboard = document.getElementById('dashboard-view');
  const officeView = document.getElementById('office-dynamic-view');
  
  if(dashboard && officeView) {
    dashboard.classList.remove('hidden');
    officeView.classList.add('hidden');
  }
  closeSidebar();
  window.scrollTo(0,0);
}

// Switch to Office Page (Dynamic)
function showOffice(key) {
  const data = officeData[key];
  if(!data) return;

  // 1. Get Elements
  const view = document.getElementById('office-dynamic-view');
  const header = document.getElementById('office-header');
  const title = document.getElementById('office-title');
  const body = document.getElementById('office-body');

  if(view && header && title && body) {
    // 2. Set Content
    title.textContent = data.title;
    body.innerHTML = data.content;

    // 3. Set Theme Colors (Remove old classes -> Add new ones)
    header.className = `card-header header-${data.theme}`;
    title.className = `text-${data.theme}`;

    // 4. Show View
    document.getElementById('dashboard-view').classList.add('hidden');
    view.classList.remove('hidden');
  }
  
  closeSidebar();
  window.scrollTo(0,0);
}

// Sidebar Utilities
const sidebar = document.getElementById('left-sidebar');
const overlay = document.getElementById('sidebar-overlay');
const openBtn = document.getElementById('sidebar-toggle');
const closeBtn = document.getElementById('sidebar-close');

function toggleSidebar() {
  if(sidebar && overlay) {
    sidebar.classList.toggle('sidebar-visible');
    if (sidebar.classList.contains('sidebar-visible')) {
        overlay.classList.remove('hidden');
    } else {
        overlay.classList.add('hidden');
    }
  }
}

function closeSidebar() {
  if(sidebar && overlay) {
    sidebar.classList.remove('sidebar-visible');
    overlay.classList.add('hidden');
  }
}

if(openBtn) openBtn.addEventListener('click', toggleSidebar);
if(closeBtn) closeBtn.addEventListener('click', closeSidebar);
if(overlay) overlay.addEventListener('click', closeSidebar);


// --- 5. CALENDAR LOGIC ---
const calendarEvents = {
  '2025-12-25': 'Christmas',
  '2026-01-01': 'New Year',
  '2026-02-14': 'Araw ng mga Puso',
  '2026-11-01': 'All Saints\' Day Holiday',
  '2026-11-30': 'Bonifacio Day Holiday'
};

const monthYearLabel = document.getElementById('current-month-year');
const calendarGrid = document.getElementById('calendar-grid');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const modal = document.getElementById('calendar-event-modal');
const closeModalBtn = document.getElementById('close-modal');
let currentDate = new Date();

function renderCalendar() {
  if(!calendarGrid) return;
  
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const today = new Date();

  if(monthYearLabel) {
    monthYearLabel.textContent = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate);
  }
  
  calendarGrid.innerHTML = '';

  const pad = firstDay.getDay();
  for (let i = 0; i < pad; i++) {
    const blank = document.createElement('div');
    blank.className = 'calendar-day placeholder';
    calendarGrid.appendChild(blank);
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const dateObj = new Date(year, month, d);
    const key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
    const dayDiv = document.createElement('div');
    dayDiv.className = 'calendar-day';
    dayDiv.textContent = d;

    if (key in calendarEvents) {
      dayDiv.classList.add('event');
      dayDiv.setAttribute('data-date', key);
      dayDiv.addEventListener('click', () => {
        showEventModal(key, calendarEvents[key]);
      });
    }

    if (dateObj.toDateString() === today.toDateString()) {
      dayDiv.classList.add('today');
    }
    calendarGrid.appendChild(dayDiv);
  }
}

function showEventModal(dateKey, event) {
  const modalDate = document.getElementById('modal-date');
  const modalEvent = document.getElementById('modal-event');
  if(modal && modalDate && modalEvent) {
      modalDate.textContent = `Date: ${dateKey}`;
      modalEvent.textContent = `Event: ${event}`;
      modal.classList.remove('hidden');
  }
}

if(closeModalBtn) closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

if(prevMonthBtn) prevMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

if(nextMonthBtn) nextMonthBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});