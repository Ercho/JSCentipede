function Enemy(x)
{
    var forward = document.getElementById('canvy');
    var helper = document.getElementById('canv-help');
    var ctx = forward.getContext('2d');
    var ctx2 = helper.getContext('2d');
    this.x = x;
    this.y = 8;
    this.r = 6;
    this.killed = false;
    var direction = true;
    var hdir = 1;
    this.speed = 3;
    this.value = 100;

    this.kill = function ()
    {
        this.killed = true;
    }

    this.move = function ()
    {
        var pointer1 = ctx2.getImageData(this.x + this.r + 1, this.y + this.r, 1, 1).data[1];
        var pointer2 = ctx2.getImageData(this.x - this.r + 1, this.y + this.r, 1, 1).data[1];
        var pointer3 = ctx2.getImageData(this.x + this.r + 1, this.y, 1, 1).data[1];
        var pointer4 = ctx2.getImageData(this.x - this.r + 1, this.y, 1, 1).data[1];
        var pointer5 = ctx2.getImageData(this.x + this.r + 1, this.y - this.r, 1, 1).data[1];
        var pointer6 = ctx2.getImageData(this.x - this.r + 1, this.y - this.r, 1, 1).data[1];
        if (this.y + this.r + 1 > forward.height || this.y+this.r -1 < 0)
            hdir *= -1;
    
        if (direction)
            this.x += this.speed;
        else
            this.x -= this.speed;
        if (pointer1 == 255 || pointer3 == 255 || pointer5 == 255 || pointer2 == 255 || pointer4 == 255 || pointer6 == 255)
            restart();
        if (pointer1 == 42 || pointer3 == 42 || pointer5 == 42)
            this.y += 4 * hdir, direction = false;
        else if (pointer2 == 42 || pointer4 == 42 || pointer6 == 42)
            this.y += 4 * hdir, direction = true;
        if (this.x < 0 || this.x > forward.width)
        {
            this.y += 10 * hdir, direction = true;
            if (this.x < 0)
                this.x = 0, direction = true;
            if (this.x > forward.width)
                this.x = forward.width, direction = false;
        }
        
    }

    this.show = function ()
    {
        ctx2.beginPath();
        ctx2.arc(this.x, this.y , this.r, 0, 2*Math.PI);
        ctx2.fillStyle = "#01f";
        ctx2.fill();
        ctx2.closePath();
        var logoImg = new Image();
        logoImg.onload = function () { };
        if(direction)
            logoImg.src = "./img/worm.png";
        else
            logoImg.src = "./img/worm2.png";
        ctx.drawImage(logoImg, this.x, this.y-3);
        ctx.closePath();
    }

}