const initial_velocity = 0.025;
const velocity_increase = 0.000001;
function randomNumberBetween(minimum,maximum){
     return Math.random() * (maximum - minimum) + minimum;
}
function isCollision(rectangle1,rectangle2){
     return (rectangle1.left <= rectangle2.right && rectangle1.right >= rectangle2.left && rectangle1.top <= rectangle2.bottom && rectangle1.bottom >= rectangle2.top);
}
export default class Ball {
     constructor(ballElement){
          this.ballElement = ballElement;
          this.reset();
     }
     get x(){
          return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--x'));
     }
     set x(value){
          this.ballElement.style.setProperty('--x',value);
     }
     get y(){
          return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--y'));
     }
     set y(value){
          this.ballElement.style.setProperty('--y',value);
     }
     rect(){
          return this.ballElement.getBoundingClientRect();
     }
     reset(){
          this.x = 50;
          this.y = 50;
          this.direction = {x: 0};
          while(Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9){
               const heading = randomNumberBetween(0,2 * Math.PI);
               this.direction = {x: Math.cos(heading),y: Math.sin(heading)}
          }
          this.velocity = initial_velocity;
     }
     update(delta,paddleRects){
          this.x += this.direction.x * this.velocity * delta;
          this.y += this.direction.y * this.velocity * delta;
          this.velocity += velocity_increase * delta;
          const rect = this.rect();
          if(rect.bottom >= window.innerHeight || rect.top <= 0){
               this.direction.y *= -1;
          }
          if(paddleRects.some(r => isCollision(r,rect))){
               this.direction.x *= -1;
          }
     }
}