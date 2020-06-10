$(() => {

    $(".datepicker").datepicker({
        dateFormat: 'mm/dd/yy',
        changeMonth: true,
        changeYear: true,
        yearRange: '-100y:c+nn',
        maxDate: '-1d'
    });

    $(".edit").click(function () {
        var userId = $(this).data('id');
        ajaxGet(userId);
    });

    $(".detail").click(function () {
        var userId = $(this).data('id');
        ajaxGet(userId);
    });

    $(".delete").click(function () {
        var userId = $(this).data('id');
        $("#userid-delete").val(userId);
    });

    $("#edit-button").click(function () {

        let data = {
            name: $("#editUser .modal-body #name").val(),
            email: $("#editUser .modal-body #email").val(),
            birthday: $("#editUser .modal-body #birthday").val(),
            tel: $("#editUser .modal-body #tel").val(),
            role: $("#editUser .modal-body #roleselect").val()
        }
        ajaxPut(data);

    });

    $("#add-button").click(function () {

        let data = {
            name: $("#addUser .modal-body #name-add").val(),
            email: $("#addUser .modal-body #email-add").val(),
            birthday: $("#addUser .modal-body #birthday-add").val(),
            tel: $("#addUser .modal-body #tel-add").val(),
            role: $("#addUser .modal-body #roleselect-add").val()
        }
        ajaxAdd(data);

    });

    $("#delete-button").click(function () {

        var userId = $("#userid-delete").val();
        ajaxDelete(userId);

    });

    $.validator.addMethod(
        "regexnumber",
        function (value, element, regexp) {
            var check = false;
            return this.optional(element) || regexp.test(value);
        },
        "Please input number."
    );

    $.validator.addMethod(
        "regexString",
        function (value, element, regexp) {
            var check = false;
            return this.optional(element) || regexp.test(value);
        },
        "Please input char and number"
    );

    $.validator.addMethod("verifyEmail",
        function (value, element) {

            var result = false;
            $.ajax({
                type: "POST",
                async: false,
                url: 'http://localhost:3000/register/checkexist',
                data: { 'email': $('#addUser .modal-body #email').val() },
                success: function (data) {
                    result = (data === 'false') ? true : false;
                }
            });
            // return true if username is exist in database
            return result;
        },
        "This email address is already registered."
    );

    $("#add-form").validate({
        rules: {
            tel: {
                regexnumber: /^[\d\s]+$/,
                minlength: 10,
                maxlength: 11
            },
            name: {
                regexString: /^[A-Za-z0-9\s]+$/
            },
            email: {
                verifyEmail: true
            }
        }
    });

    $("#edit-form").validate({
        rules: {
            tel: {
                regexnumber: /^[\d\s]+$/,
                minlength: 10,
                maxlength: 11
            },
            name: {
                regexString: /^[A-Za-z0-9]+$/
            }
        }
    });

    function ajaxGet(userid) {
        $.ajax({
            type: "GET",
            url: "http://localhost:3000/view-user/" + userid,
            success: function (result) {
                $(".modal-body #name").val(result.data.name);
                $(".modal-body #email").val(result.data.email);
                $(".modal-body #birthday").val(result.data.birthday);
                $(".modal-body #tel").val(result.data.tel);
                $(".modal-body #roleselect").val(result.data.role);
                //$(".modal-body #role").val(result.role);
                console.log("Success: ", result);
            },
            error: function (e) {
                console.log("ERROR: ", e);
            }
        });
    }

    function ajaxPut(data) {
        console.log(data);
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: "http://localhost:3000/view-user",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (result) {
                //window.location.href = window.location;
                $('#editUser').modal('hide');
                $.notify({
                    message: result.message,
                    type: 'success'
                }, {
                    delay: 400,
                    timer: 400,
                });
            },
            error: function (e) {
                console.log('ERROR: ', e);
            }
        });

    }

    function ajaxAdd(data) {

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "http://localhost:3000/view-user",
            data: JSON.stringify(data),
            dataType: 'json',
            success: function (result) {
                console.log(result);
                resetFormAdd();
                $('#addUser').modal('hide');
                $.notify({
                    message: result.message,
                    type: 'success'
                }, {
                    delay: 400,
                    timer: 400,
                });
                let stringHtml = `<tr>
                    <td>${result.data._id}</td>
                    <td>${result.data.name}</td>
                    <td>${result.data.email}</td>
                    <td>${result.data.tel}</td>
                    <td>
                        <a href="#detailUser" class="detail" data-toggle="modal" data-id="${result.data.id}">View
                            Detail</a>
                    </td>
                    <td>
                        <a href="#editUser" class="edit" data-toggle="modal" data-id="${result.data.id}"><i
                                class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                        <a href="#deleteUser" class="delete" data-toggle="modal" data-id="${result.data.id}"><i
                                class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                    </td>
                </tr>`;
                $(".table tbody").append(stringHtml);
            },
            error: function (e) {
                console.log('ERROR: ', e);
            }
        });

    }

    function ajaxDelete(userid) {
        $.ajax({
            type: "delete",
            url: "http://localhost:3000/view-user/" + userid,
            success: function (result) {
                $('#deleteUser').modal('hide');
                console.log("Success: ", result);
                notify(result.message)
            },
            error: function (e) {
                console.log("ERROR: ", e);
            }
        });
    }

    function notify(message, type) {
        $.notify({
            message: message,
            type: type
        },{
            delay: 200,
	        timer: 200,
        });
    }

    function resetFormAdd() {
        $("#addUser .modal-body #name-add").val(''),
        $("#addUser .modal-body #email-add").val(''),
        $("#addUser .modal-body #birthday-add").val(''),
        $("#addUser .modal-body #tel-add").val(''),
        $("#addUser .modal-body #roleselect-add").val('')
    }

})