document.addEventListener("DOMContentLoaded", function () {
  let head = document.getElementsByTagName("HEAD")[0];
  let link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href =
    "https://westerndigital.com/content/dam/store/en-us/assets/sys/webnext/webnext.css";
  head.appendChild(link);

  createWebnextObserver(".webnext-animate", webnextAnimate);
  createWebnextObserver(
    ".webnext-video",
    webnextAutoplay,
    videoAutoplayActions
  );

  function createWebnextObserver(
    targetElements,
    callback,
    observation,
    configurations = null
  ) {
    const webnextObserver = new IntersectionObserver(
      callback,
      configurations || { root: null, rootMargin: "0px", threshold: 0.5 }
    );

    webnextObserve(targetElements, webnextObserver, observation);
  }

  function webnextObserve(targetElements, observer, observation) {
    const targets = document.querySelectorAll(targetElements);
    for (const target of targets) {
      observer.observe(target);
      observation ? observation(target) : null;
    }
  }

  function videoAutoplayActions(target) {
    let video = target.querySelectorAll(":scope video")[0];
    ![...target.classList].includes("webnext-video-loop")
      ? video.removeAttribute("loop")
      : null;
    video.pause();
  }

  function webnextAutoplay(entries) {
    let video;
    entries.forEach((entry) => {
      video = entry.target.querySelectorAll(":scope video")[0];
      entry.isIntersecting && !video.ended ? video.play() : video.pause();
    });
  }

  function webnextAnimate(entries, observer) {
    var trigger;
    entries.forEach((entry) => {
      trigger = ["webnext-animated", entry.isIntersecting];
      if ([...entry.target.classList].includes("webnext-repeater")) {
        entry.target.classList.toggle(...trigger);
      } else if (entry.isIntersecting) {
        entry.target.classList.add(...trigger);
        observer.unobserve(entry.target);
      }
    });
  }
});
