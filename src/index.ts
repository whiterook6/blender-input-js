const input = document.getElementById('input') as HTMLInputElement;
let isDragging = false;

input.addEventListener('mousedown', (event: MouseEvent) => {
  let startX: number = event.clientX;
  let startValue: number = parseFloat(input.value) || 0;
  isDragging = true;
  

  const onMouseMove = (event: MouseEvent) => {
    if (isDragging) {
      const diff = (event.clientX - startX) / 10;
      input.value = (diff + startValue).toFixed(2);
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