

const links = document.querySelectorAll('a[href^="#"]');
links.forEach((el) => {
  el.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    activate(el);
  })
});

function activate(elem) {
  links.forEach((el) => {
    el.classList.remove('current');
  });
  elem.classList.add('current');
  window.scrollTo(0, 0);
}

if (window.location.href.indexOf('#') === -1) {
  const elem = document.querySelector('a[href="#accueil"]');
  window.location.hash = 'accueil';
  activate(elem);
} else {
  const elem = document.querySelector('a[href="'+window.location.hash+'"]');
  elem && activate(elem);
}


/*
 *
 * Promised based scrollIntoView( { behavior: 'smooth' } )
 * @param { Element } elem
 **  ::An Element on which we'll call scrollIntoView
 * @param { object } [options]
 **  ::An optional scrollIntoViewOptions dictionary
 * @return { Promise } (void)
 **  ::Resolves when the scrolling ends
 *
 */
function smoothScroll( elem, options ) {
  return new Promise( (resolve) => {
    if( !( elem instanceof Element ) ) {
      throw new TypeError( 'Argument 1 must be an Element' );
    }
    let same = 0; // a counter
    let lastPos = null; // last known Y position
    // pass the user defined options along with our default
    const scrollOptions = Object.assign( { behavior: 'smooth' }, options );

    // let's begin
    elem.scrollIntoView( scrollOptions );
    requestAnimationFrame( check );

    // this function will be called every painting frame
    // for the duration of the smooth scroll operation
    function check() {
      // check our current position
      const newPos = elem.getBoundingClientRect().top;

      if( newPos === lastPos ) { // same as previous
        if(same ++ > 2) { // if it's more than two frames
          /* @todo: verify it succeeded
          * if(isAtCorrectPosition(elem, options) {
          *   resolve();
          * } else {
          *   reject();
          * }
          * return;
          */
          return resolve(); // we've come to an halt
        }
      }
      else {
        same = 0; // reset our counter
        lastPos = newPos; // remember our current position
      }
      // check again next painting frame
      requestAnimationFrame(check);
    }
  });
}
