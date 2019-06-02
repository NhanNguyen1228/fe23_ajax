function DanhSachNguoiDung() {

    // mangNguoiDung = [];

    this.layDanhSachNguoiDung = function () {
        return $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/DanhSachNguoiDung`,
            type: "GET"
        });
        // .done(function (data) { // Thanh cong               
        //     // console.log(this.mangNguoiDung);
        //     // taoBang(data);
        // })
        // .fail(function (err) { // That bai
        //     console.log(err);
        // }); 

        // console.log(mangNguoiDung);     
    };

    this.themNguoiDung = function (nguoiDung) {
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/ThemNguoiDung`,
            type: "POST",
            data: nguoiDung
        })
            .done(function (data) {
                if (data === "tai khoan da ton tai !") { // Bên back-end viết như nào thì mình làm như vậy. Còn muốn kt thì xem ở console.
                    alert(data);
                } else {
                    location.reload();
                }

                console.log(data);
            })
            .fail(function (err) {
                console.log(err);
            });
    };

    this.xoaNguoiDung = function (nguoiDung) {
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/XoaNguoiDung/${nguoiDung}`,
            type: "DELETE"
        })
            .done(function (data) {
                console.log(data);
                location.reload();
            })
            .fail(function (err) {
                console.log(err);
            });
    };

    this.layThongTinNguoiDung = function(taiKhoan){
        var mangNguoiDung = JSON.parse(localStorage.getItem("DSND"));
        return mangNguoiDung.find(function(item){
            return item.TaiKhoan === taiKhoan; // item.TaiKhoan => Viết theo backend
        })
    };

    this.capNhatNguoiDung = function(nguoiDung){
        var ngd = JSON.stringify(nguoiDung);
        $.ajax({
            url: `http://svcy.myclass.vn/api/QuanLyTrungTam/CapNhatThongTinNguoiDung`,
            type: "PUT",
            data: ngd,
            contentType: "application/json",
            dataType: "json"
        })
            .done(function (data) {
                console.log(data);
                location.reload(); // Cập nhật thành công thì reload lại trang.
            })
            .fail(function (err) {
                console.log(err);
            });
    };
}

// Vì bất đồng bộ nên ta phải tạo bảng ở đây và gọi lại .done => Cách 2 ta có thể viết trực tiếp taoBang() bên file main.js
// function taoBang(mangNguoiDung) {
//     var tblBody = $("#tblDanhSachNguoiDung");
//     var content = "";
//     mangNguoiDung.map(function (item, index) {
//         content += `
//             <tr>
//                 <td>${index + 1}</td>
//                 <td>${item.TaiKhoan}</td>
//                 <td>${item.MatKhau}</td>
//                 <td>${item.HoTen}</td>
//                 <td>${item.Email}</td>
//                 <td>${item.SoDT}</td>
//                 <td>
//                     <button class="btn btn-primary btnSua"
//                         data-taikhoan="${item.TaiKhoan}" data-toggle="modal" data-target="#myModal"> Sửa
//                     </button>
//                     <button class="btn btn-danger btnXoa" id="btnXoa" 
//                         data-taikhoan="${item.TaiKhoan}"> Xóa
//                     </button>
//                 </td>
//             </tr>
//         `
//     })
//     tblBody.html(content);
// };