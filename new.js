const allCourses = [
      { courseName: '', courseCode: '', timeSlot: '09:00 - 12:00', day: 'Monday', color: '' },
      { courseName: '', courseCode: '', timeSlot: '01:00 - 04:00', day: 'Monday', color: '' },
      { courseName: '', courseCode: '', timeSlot: '04:00 - 07:00', day: 'Monday', color: '' },
      { courseName: '', courseCode: '', timeSlot: '01:00 - 04:00', day: 'Tuesday', color: '' },
      { courseName: '', courseCode: '', timeSlot: '09:00 - 12:00', day: 'Wednesday', color: '' },
      { courseName: '', courseCode: '', timeSlot: '10:00 - 12:00', day: 'Friday', color: '' },
      { courseName: '', courseCode: '', timeSlot: '01:00 - 03:00', day: 'Friday', color: '' },
      { courseName: '', courseCode: '', timeSlot: '04:00 - 07:00', day: 'Friday', color: '' },


      { courseName: 'Data Structure (IT 200)', courseCode: 'BSIT 211-B', timeSlot: '09:00 - 12:00', day: 'Monday', color: 'green' },
      { courseName: 'Object Oriented Programming (IT 403)', courseCode: 'BSIT 211-B', timeSlot: '01:00 - 04:00', day: 'Monday', color: 'bg-purple-100' }, 
      { courseName: 'Foreign Language (FL 1)', courseCode: 'BSIT 211-B', timeSlot: '04:00 - 07:00', day: 'Monday', color: 'green' },
      { courseName: 'Basic Networking (IT 200)', courseCode: 'BSIT 211-B', timeSlot: '01:00 - 04:00', day: 'Tuesday', color: 'green' },
      { courseName: 'Design & Implementation of Programming (IT 105)', courseCode: 'BSIT 211-B', timeSlot: '09:00 - 12:00', day: 'Wednesday', color: 'green' },
      { courseName: 'P.E 3', courseCode: 'BSIT 211-B', timeSlot: '10:00 - 12:00', day: 'Friday', color: 'green' },
      { courseName: 'Olivarian 103', courseCode: 'BSIT 211-B', timeSlot: '01:00 - 03:00', day: 'Friday', color: 'green' },
      { courseName: 'Logic and Critical Thinking (MC 4)', courseCode: 'BSIT 211-B', timeSlot: '04:00 - 07:00', day: 'Friday', color: 'green' },
    ];

    // Schedules
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlots = ['09:00 - 12:00', '10:00 - 12:00', '01:00 - 03:00', '01:00 - 04:00', '04:00 - 06:00', '04:00 - 07:00'];
    const scheduleGrid = document.getElementById('schedule-grid');
    const courseSearch = document.getElementById('course-search');

    function renderSchedule(filtered = allCourses) {
      // Clear all rows except the header row (which is the first child)
      while (scheduleGrid.children.length > 1) {
        scheduleGrid.removeChild(scheduleGrid.lastChild);
      }

      timeSlots.forEach((slot) => {
        // Create row container
        const row = document.createElement('div');
        row.setAttribute('role', 'row');
        row.className = 'grid-row';

        // Time cell (Day Label in this grid structure)
        const timeCell = document.createElement('div');
        timeCell.setAttribute('role', 'gridcell');
        timeCell.className = 'cell day-label';
        timeCell.textContent = slot;
        timeCell.setAttribute('aria-label', `Time slot ${slot}`);
        row.appendChild(timeCell);

        // Cells for days
        days.forEach((day) => {
          const dayCell = document.createElement('div');
          dayCell.setAttribute('role', 'gridcell');
          dayCell.className = 'cell';
          dayCell.setAttribute('data-day', day);

          // Find matching course
          const course = filtered.find(c => c.day === day && c.timeSlot === slot);
          if (course && course.courseName) {
            const block = document.createElement('div');
            // Use the hardcoded 'green' style for demonstration consistency
            block.className = `course-block green`; 
            block.innerHTML = `<strong>${course.courseName}</strong><br/><span>${course.courseCode}</span>`;
            dayCell.appendChild(block);
          }
          row.appendChild(dayCell);
        });

        scheduleGrid.appendChild(row);
      });
    }

    // Announcements
    const announcements = [
      { title: 'Class Suspended', body: 'Due to weather, there will be no in-person classes on 22/10/25. Online class may be conducted.' },
      { title: 'Midterm Week', body: 'Finals exams will be on December 1-6.' },
      { title: 'PAgtapos ng 6', body: 'Bakasyon na' },
      { title: 'Year end Party', body: 'Year end Party' },
      { title: 'New Year', body: 'Happy New Year 2026!' }
    ];
    const announcementList = document.getElementById('announcement-list');
    function renderAnnouncements() {
      announcementList.innerHTML = '';
      announcements.forEach(a => {
        const div = document.createElement('div');
        div.className = 'item';
        div.innerHTML = `<strong>${a.title}</strong><div class="text">${a.body}</div>`;
        announcementList.appendChild(div);
      });
    }

    // Calendar
    const calendarEvents = {
      '2025-12-25': 'Christmas',
      '2026-01-01': 'New Year',
      '2026-02-14': 'Araw ng mga Puso',
      '2026-02-10': 'hehe',
      '2026-11-01': 'All Saints\' Day Holiday',
      '2026-11-30': 'Bonifacio Day Holiday'
    };

    const monthYearLabel = document.getElementById('current-month-year');
    const calendarGrid = document.getElementById('calendar-grid');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const modal = document.getElementById('calendar-event-modal');
    const modalDate = document.getElementById('modal-date');
    const modalEvent = document.getElementById('modal-event');
    const closeModalBtn = document.getElementById('close-modal');
    let currentDate = new Date();

    function renderCalendar() {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const today = new Date();

      monthYearLabel.textContent = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentDate);

      calendarGrid.innerHTML = '';

      // blank cells for days before first day. 0=Sun, 1=Mon, ..., 6=Sat
      const pad = firstDay.getDay();
      for (let i = 0; i < pad; i++) {
        const blank = document.createElement('div');
        blank.className = 'calendar-day placeholder';
        calendarGrid.appendChild(blank);
      }

      // days
      for (let d = 1; d <= lastDay.getDate(); d++) {
        const dateObj = new Date(year, month, d);
        const key = `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
        const dayDiv = document.createElement('div');
        dayDiv.className = 'calendar-day';
        dayDiv.textContent = d;

        if (key in calendarEvents) {
          dayDiv.classList.add('event');
          dayDiv.setAttribute('data-date', key);
          dayDiv.setAttribute('data-event', calendarEvents[key]);
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
      modalDate.textContent = `Date: ${dateKey}`;
      modalEvent.textContent = `Event: ${event}`;
      modal.classList.remove('hidden');
    }
    closeModalBtn.addEventListener('click', () => modal.classList.add('hidden'));

    prevMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });
    nextMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });

    // Init
    document.addEventListener('DOMContentLoaded', () => {
      renderSchedule(allCourses);
      renderAnnouncements();
      renderCalendar();
      // basic search
      courseSearch.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        const filtered = allCourses.filter(c =>
          c.courseName.toLowerCase().includes(q) ||
          c.courseCode.toLowerCase().includes(q)
        );
        renderSchedule(filtered);
      });
    });