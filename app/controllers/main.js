$(document).ready(function () {

    var danhSachNguoiDung = new DanhSachNguoiDung();

    layDanhSachNguoiDung();

    function layDanhSachNguoiDung() {
        danhSachNguoiDung
            .layDanhSachNguoiDung()

            .done(function (result) { // trả về thành công.  
                // Lưu dữ liệu xuống localStorage.
                localStorage.setItem("DSND", JSON.stringify(result));

                taoBang(result);
            })

            .fail(function (err) { // trả về thất bại.
                console.log(err);
            });
    }

    function taoBang(mangNguoiDung) {
        var tblBody = $("#tblDanhSachNguoiDung");
        var content = "";
        mangNguoiDung.map(function (item, index) {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.TaiKhoan}</td>
                    <td>${item.MatKhau}</td>
                    <td>${item.HoTen}</td>
                    <td>${item.Email}</td>
                    <td>${item.SoDT}</td>
                    <td>${item.TenLoaiNguoiDung}</td>
                    <td>
                        <button class="btn btn-primary btnSua"
                            data-taikhoan="${item.TaiKhoan}" data-toggle="modal" data-target="#myModal"> Sửa
                        </button>
                        <button class="btn btn-danger btnXoa" id="btnXoa" 
                            data-taikhoan="${item.TaiKhoan}"> Xóa
                        </button>
                    </td>
                </tr>
            `
        })
        tblBody.html(content);
    };

    // Tạo một hàm sử dụng chung lại.
    function showPopup(title, titleButton, idBtn) {
        var title = title;

        $(".modal-title").html(title);

        var footer = `
            <button id="${idBtn}" class="btn btn-success"> ${titleButton} </button>
            <button id="btnDong" class="btn btn-danger" data-dismiss="modal">Đóng</button>
        `
        $(".modal-footer").html(footer);
    }

    $("#btnThemNguoiDung").click(function () {
        showPopup("Thêm người dùng", "Thêm", "btnThem");

        $("#TaiKhoan").removeAttr("disabled");
    });

    $("body").delegate(".btnSua", "click", function () {
        showPopup("Cập nhật người dùng", "Cập nhật", "btnCapNhat");

        var taiKhoan = $(this).data("taikhoan");

        var nguoiDung = danhSachNguoiDung.layThongTinNguoiDung(taiKhoan);

        $("#TaiKhoan").val(nguoiDung.TaiKhoan);

        $("#TaiKhoan").attr("disabled", true);

        $("#HoTen").val(nguoiDung.HoTen);
        $("#MatKhau").val(nguoiDung.MatKhau);
        $("#Email").val(nguoiDung.Email);
        $("#SoDienThoai").val(nguoiDung.SoDT);
        $("#loaiNguoiDung").val(nguoiDung.MaLoaiNguoiDung);
    })

    $("body").delegate("#btnCapNhat", "click", function () {
        // Lấy thông tin từ 6 ô input.
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();

        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, loaiNguoiDung);
        danhSachNguoiDung.capNhatNguoiDung(nguoiDung);

        $("#btnDong").click();
    })

    $("body").delegate("#btnThem", "click", function () {
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var soDT = $("#SoDienThoai").val();
        var loaiNguoiDung = $("#loaiNguoiDung").val();

        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, loaiNguoiDung);
        danhSachNguoiDung.themNguoiDung(nguoiDung);
    });

    $("body").delegate(".btnXoa", "click", function () {
        var taiKhoan = $(this).data("taikhoan");
        danhSachNguoiDung.xoaNguoiDung(taiKhoan);
    })
});