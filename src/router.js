function dispach (url, selector, push = true) {
    if ( !url || !selector ) {
        return;
    } 
    const el = document.querySelector(selector);
    fetch(url)
        .then(response => response.text())
        .then(html => {
            el.innerHTML = html;
            if ( push ) {
                urlParts = url.split('/');
                const file = urlParts[urlParts.length - 1].replace('.html', '');
                history.pushState({ selector }, null, '#' + file);
            }
        });
}

document.querySelectorAll('[route]').forEach(link => {
    const file = link.attributes['route'].value;
    const to = link.attributes['to'].value;

    link.onclick = e => {
        e.preventDefault();
        dispach(`src/pages/${file}.html`, to);
    };
});

window.onpopstate = e => {
    if (e.state) {
        dispach(window.location.href, e.state.selector, false);
    }
}