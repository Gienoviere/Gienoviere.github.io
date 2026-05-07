// Set skill bar widths from data-width attribute
document.querySelectorAll('.skill-bar').forEach(bar => {
    const width = bar.getAttribute('data-width') + '%';
    bar.style.setProperty('--skill-width', width);
    bar.style.width = width; // fallback
});