function toggleAnnotation(toggleElement) {
    const hidden = toggleElement.classList.contains('hidden');
    hideAllAnnotations();
    if (hidden) {
        toggleElement.classList.toggle('hidden');

        toggleElement.style.top = '100%';
        toggleElement.style.bottom = 'auto';
        toggleElement.style.transform = 'translateX(-50%)';

        const rect = toggleElement.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        if (rect.bottom > viewportHeight) {
            toggleElement.style.top = 'auto';
            toggleElement.style.bottom = '100%';
        }

        // Horizontal correction
        if (rect.right > viewportWidth) {
            // It's off the right edge
            const offset = rect.right - viewportWidth + 10; // 10px padding
            toggleElement.style.transform = `translateX(calc(-50% - ${offset}px))`;
        } else if (rect.left < 0) {
            // It's off the left edge
            console.log("Left edge")
            const offset = Math.abs(rect.left) + 10;
            toggleElement.style.transform = `translateX(calc(-50% + ${offset}px))`;
        }

        if (window.innerWidth < 768) {
            const rect = toggleElement.getBoundingClientRect();
            if (rect.width > window.innerWidth * 0.9) {
                // If the box is nearly full-screen width, 
                // force it to align to the viewport rather than the word.
                toggleElement.style.left = '5vw';
                toggleElement.style.transform = 'none';
            }
        }

    }
}

// Add an event listener to hide all annotations when clicking anywhere on the page
document.addEventListener('click', function (event) {
    // Check if the clicked element is NOT an element that is otherwise a toggle
    if (!event.target.matches('.txt:has(~ .annotation), .annotation-toggle')) {
        hideAllAnnotations();
    }
});

function hideAllAnnotations() {
    const annotations = document.querySelectorAll('.annotation');
    annotations.forEach(function (annotation) {
        annotation.classList.add('hidden');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.wd:has(.annotation), .annotation-toggle:has(.annotation)');

    elements.forEach(element => {
        element.addEventListener('click', function () {
            const annotation = this.querySelectorAll('.annotation');
            if (annotation[0]) {
                toggleAnnotation(annotation[0]);
            }
        });
    });
});