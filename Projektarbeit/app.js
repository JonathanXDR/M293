window.onload = function () {
  timelineScrolling();
  age();
  trainingYear();
  intersectionObserver();
  openNav();
  closeNav();
  filterSelection('all');
};

/* -------------------------- IntersectionObserver -------------------------- */

function intersectionObserver() {
  const inViewport = (entries, observer) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-inViewport', entry.isIntersecting);
    });
  };

  const Obs = new IntersectionObserver(inViewport);
  const obsOptions = {};

  const ELs_inViewport = document.querySelectorAll('[data-inviewport]');
  ELs_inViewport.forEach((EL) => {
    Obs.observe(EL, obsOptions);
  });
}

/* ---------------------------------- Menu ---------------------------------- */

function openNav() {
  const menuState = document.getElementById('ac-ln-menustate');
  if (menuState.checked) {
    document.getElementById('ac-localnav').classList.add('nav-open');
  }
  menuState.addEventListener('change', function () {
    if (this.checked) {
      document.getElementById('ac-localnav').classList.add('nav-open');
    } else {
      document.getElementById('ac-localnav').classList.remove('nav-open');
    }
  });
}

function closeNav() {
  window.addEventListener('scroll', function () {
    if (
      document.getElementById('ac-localnav').classList.contains('nav-open') &&
      window.scrollY > 0
    ) {
      document.getElementById('ac-localnav').classList.remove('nav-open');
      document.getElementById('ac-ln-menustate').checked = false;
    }
  });
}

/* ----------------------------------- Age ---------------------------------- */

function age() {
  let d1 = 12;
  let m1 = 12;
  let y1 = 2005;

  let date = new Date();
  let d2 = date.getDate();
  let m2 = 1 + date.getMonth();
  let y2 = date.getFullYear();
  let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (d1 > d2) {
    d2 = d2 + month[m2 - 1];
    m2 = m2 - 1;
  }
  if (m1 > m2) {
    m2 = m2 + 12;
    y2 = y2 - 1;
  }
  let d = d2 - d1;
  let m = m2 - m1;
  let y = y2 - y1;

  document.getElementById('age').textContent = y;
}

/* ------------------------- Training Year ------------------------- */

function trainingYear() {
  let d1 = 01;
  let m1 = 08;
  let y1 = 2021;

  let date = new Date();
  let d2 = date.getDate();
  let m2 = 1 + date.getMonth();
  let y2 = date.getFullYear();
  let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (d1 > d2) {
    d2 = d2 + month[m2 - 1];
    m2 = m2 - 1;
  }
  if (m1 > m2) {
    m2 = m2 + 12;
    y2 = y2 - 1;
  }

  let d = 01 - d1;
  let m = 01 - m1;
  let y = 2021 - y1 + 1;

  if (y > 4) {
    y = 4;
  }

  document.getElementById('training-year').textContent = y;
}

/* ------------------------------- Categories ------------------------------- */

//parameter passed from button (Parameter same as category)
function filterSelection(value) {
  //Button class code
  let buttons = document.querySelectorAll('.link[data-v-2a555971]');
  buttons.forEach((button) => {
    //check if value equals innerText
    // console.log(value.toUpperCase());
    // console.log(button.innerText.toUpperCase());
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add('current');
    } else {
      button.classList.remove('current');
    }
  });

  //select all cards
  let elements = document.querySelectorAll('.project');
  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    if (value == 'all') {
      element.classList.remove('visible');
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //display element based on category
        element.classList.remove('visible');
      } else {
        //hide other elements
        element.classList.add('visible');
      }
    }
  });
}

/* -------------------------------- Timeline -------------------------------- */

function timelineScrolling() {
  let ticking = false;
  let last_known_scroll_position = 0;
  let updatePath = false;

  const element = document.getElementById('svg-timeline');
  const path = element.querySelector('path');
  let totalLength = 0;

  let timelineHeight = 0;

  setTimeout(() => {
    timelineHeight = document.getElementById('timeline-id').offsetHeight;
    // console.log(Math.ceil(timelineHeight));
    const size = parseInt(Math.ceil(timelineHeight));
    // console.log(size);

    element.setAttribute('viewBox', `0 0 8 ${size}`);
    element.setAttribute('height', size);
    element.setAttribute('xmlns', `http://www..org/${size}/svg`);

    path.setAttribute('d', `M 4 0 L 4 ${size}`);

    path.setAttribute('stroke-dasharray', totalLength);

    initPath(path);

    function initPath(path) {
      totalLength = path.getTotalLength();
      path.style.strokeDasharray = `${totalLength}`;
      path.style.strokeDashoffset = totalLength;
    }

    function handleEntries(entries) {
      console.log(entries);
      entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
          console.log(entry.target);
        }
      });
    }

    let observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // console.log(entry);
            updatePath = true;
          } else {
            updatePath = false;
          }
        });
      },
      { rootMargin: '0px 0px 0px 0px' }
    );

    observer.observe(element);

    function doSomething(scroll_pos) {
      if (!updatePath) {
        return;
      }
      window.requestAnimationFrame(() => {
        const center = window.innerHeight / 2;
        const boundaries = path.getBoundingClientRect();
        const top = boundaries.top;
        const height = boundaries.height;
        const percentage = (center - top) / height;
        const drawLength = percentage > 0 ? totalLength * percentage : 0;
        path.style.strokeDashoffset =
          drawLength < totalLength ? totalLength - drawLength : 0;
      });
    }

    window.addEventListener('scroll', function (e) {
      last_known_scroll_position = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(function () {
          doSomething(last_known_scroll_position);
          ticking = false;
        });

        ticking = true;
      }
    });
  }, 500);
}

if (document.getElementById('timeline') === true) {
  const timelineHeight = document.getElementById('timeline-id').offsetHeight;
  console.log(timelineHeight);
}
