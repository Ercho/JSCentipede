function Obstacle(x, y)
{
    var forward = document.getElementById('canvy');
    var helper = document.getElementById('canv-help');
    var ctx = forward.getContext('2d');
    var ctx2 = helper.getContext('2d');
    this.x = x*20;
    this.y = y*20+6;
    this.killed = 0;
    this.value = 10;

    this.kill = function ()
    {
        this.killed++;
    }

    this.show = function ()
    {
        ctx2.beginPath();
        ctx2.rect(this.x, this.y, 10, 10);
        ctx2.fillStyle = "rgba(255,255,255,0.8)";
        ctx2.fill();
        ctx2.closePath();
        ctx.beginPath();
        var logoImg = new Image();
        logoImg.onload = function () { };
        logoImg.src = "./img/shroom_" + this.killed + ".png";
        ctx.drawImage(logoImg, this.x, this.y);
        ctx.closePath();
        ctx2.beginPath();
        ctx2.rect(this.x+(this.killed), this.y+(this.killed), 10-(this.killed*2), 10-(this.killed*2));
        ctx2.fillStyle = "rgba(255,0,255,0.8)";
        ctx2.fill();
        ctx2.closePath();
    }

}