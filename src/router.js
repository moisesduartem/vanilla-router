function dispach (url, selector) {
    if ( !url || !selector ) {
        return;
    } 
    const el = document.querySelector(selector);
    fetch(url)
        .then(response => response.text())
        .then(html => el.innerHTML = html);
}

document.querySelectorAll('[route]').forEach(link => {
    const file = link.attributes['route'].value;
    const to = link.attributes['to'].value;

    link.onclick = e => {
        e.preventDefault();
        dispach(`src/pages/${file}.html`, to);
    };
});