const input = document.getElementById('input') as HTMLInputElement;
let isDragging = false;

input.addEventListener('mousedown', () => {
  let startX = input.offsetLeft;
  let startValue = parseInt(input.value);
  isDragging = true;
  

  const onMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const diff = (event.clientX - startX) / 10;
      input.value = diff.toString() + startValue;
    }
  }

  const onMouseUp = () => {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});