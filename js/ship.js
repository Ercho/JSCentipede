function Ship()
{
    var forward = document.getElementById('canvy');
    var helper = document.getElementById('canv-help');
    var ctx = forward.getContext('2d');
    var ctx2 = helper.getContext('2d');
    this.x = forward.width / 2;
    this.y = forward.height - 21;

    this.show = function ()
    {
        ctx2.beginPath();
        ctx2.rect(this.x, this.y, 20, 20);
        ctx2.fillStyle = "#0f0";
        ctx2.fill();
        ctx2.closePath();
        ctx.beginPath();
        var logoImg = new Image();
        logoImg.onload = function () { };
        logoImg.src = "./img/ship.png";
        ctx.drawImage(logoImg, this.x, this.y);
        ctx.closePath();
    }

     
    this.move = function (dir, dir2)
    {
        this.x += dir * 15;
        this.y += dir2 * 15;
        if (this.y < forward.height * 3 / 4)
            this.y = forward.height * 3 / 4;
        else if (this.y + 20 > forward.height)
            this.y = forward.height - 20;
        else if (this.x + 20 > forward.width)
            this.x = forward.width - 20;
        else if (this.x < 0)
            this.x = 0;
        return
    }
}