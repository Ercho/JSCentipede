function Tilter()
{
    var forward = document.getElementById('canvy');
    var helper = document.getElementById('canv-help');
    var ctx = forward.getContext('2d');
    var ctx2 = helper.getContext('2d');
    this.x = parseInt(Math.random() * 800);
    this.y = parseInt(Math.random() * 400);
    this.killed = false;
    this.r = 8;
    this.speed = 2;
    var direct = parseInt(Math.random() * 4) + 1;
    this.value = 500;
    var death = new Date().getSeconds()+20;
    if(death>60)
        death-=60;

    this.kill = function ()
    {
        this.killed = true;
    }

    function distance(x1, y1, x2, y2)
    {
        var x = Math.abs(x2 - x1);
        var y = Math.abs(y2 - y1);
        return Math.sqrt((x * x) + (y * y));
    }

    this.move = function ()
    {
        var dis = distance(this.x, this.y, ship.x, ship.y);
        if (dis < 13.5)
            restart();
        switch (direct)
        {
            case 1:
                this.x += this.speed;
                this.y -= this.speed;
                if (this.y < 1)
                {
                    this.y = 0;
                    direct = 2;
                }
                if (this.x > 779)
                {
                    this.x = 780;
                    direct = 4;
                }
                break;
            case 2:
                this.x += this.speed;
                this.y += this.speed;
                if (this.y > 589)
                {
                    this.y = 590;
                    direct = 1;
                }
                if (this.x > 779)
                {
                    this.x = 780;
                    direct = 3;
                }
                break;
            case 3:
                this.x -= this.speed;
                this.y += this.speed;
                if (this.y > 589)
                {
                    this.y = 590;
                    direct = 4;
                }
                if (this.x < 1)
                {
                    this.x = 0;
                    direct = 2;
                }
                break;
            case 4:
                this.x -= this.speed;
                this.y -= this.speed;
                if (this.y < 1)
                {
                    this.y = 0;
                    direct = 3;
                }
                if (this.x < 1)
                {
                    this.x = 0;
                    direct = 1;
                }
                break;
        }

    }

    this.show = function ()
    {
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx2.fillStyle = "#01f";
        ctx2.fill();
        ctx2.closePath();
        var logoImg = new Image();
        logoImg.onload = function () { };
        logoImg.src = "./img/tilter.png";
        ctx.drawImage(logoImg, this.x, this.y - 3);
        ctx.closePath();
        if (new Date().getSeconds() == death)
            this.killed = true;
    }

}