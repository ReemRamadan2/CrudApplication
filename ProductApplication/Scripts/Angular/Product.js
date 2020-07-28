var App = angular.module('MyApp', ['ngRoute']);
App.controller('ProductController', function ($scope, ProductService) {
    $scope.isFormValid = false;
    $scope.message = null;
    $scope.Products = null;
    ProductService.GetProductList().then(function (d) {
        $scope.product = d.data;
    },
        function () {
            alert('Failed');
        });

    $scope.Products = {
        Id: '',
        Name: '',
        Price: '',
        Category: '',
      
    };

    //Add Product Record function
    $scope.ProductRecord = function (data) {
        $scope.message = '';
        $scope.Products = data;
        if ($scope.isFormValid) {
            ProductService.AddProduct($scope.Products).then(function (d) { 
                alert(d);
                if (d == 'Success') {
                    //Clear Form
                    ClearForm();
                }
            });
        }
        else {
            $scope.message = 'Please fill the required fields';
        }
    };

    //Delete Product Record function
    $scope.DelProduct = function (product) {
        if (product.Id != null) {
            if (window.confirm('Are you sure you want to delete this Id = ' + product.Id + '?'))
            {
                EmployeeService.DelProductData(product.Id).then(function (product) { 
                    window.location.href = '/Product/Index';
                }, function () {
                    alert("Error in deleting record");
                });
            }
        }
        else {
            alert("this id is null");
        }
    };

    //Update Product Data function
    $scope.UpdateProduct = function () {
        var Product = {};
        Product["Id"] = $scope.Id;
        Product["Name"] = $scope.Name;
        Product["Price"] = $scope.Price;
        Product["Category"] = $scope.Category;
        ProductService.UpdateProductData(Product);
    }

    //Redrect index form to edit form with parameter
    $scope.RedirectToEdit = function (product) {
        window.location.href = '/Product/odata/Edit/' + product.Id;
    };


    //Calling GetProductByID() from service. 
    productService.GetproductByID().success(function (data) {
        $scope.product = data;
        $scope.ProductId = data.Id;
        $scope.ProductName = data.Name;
        $scope.ProductPrice = data.Price;
        $scope.ProductCategory = data.Category;
      
    });

    //Clear Form Funciton
    function ClearForm() {
        $scope.Product = {};
        $scope.CreateForm.$setPristine();
        $scope.UpdateProduct = {};
        $scope.EditForm.$setPristine();
    }
});
App.factory('ProductService', function ($http, $q, $window) {
    return {
        //Get all Product List
        GetProductList: function () {
            return $http.get('/Product/odata/GetAllProduct');
        },

        GetProductId: function () {
            var urlPath = $window.location.href;
            var result = String(urlPath).split("/"); 
            if (result != null && result.length > 0) {
                var id = result[result.length - 1]; 
                return id;
            }
        },

        GetProductByID: function () { 
            var currentProductID = this.GetProductId();
            if (currentProductID != null) {
                return $http.get('/Product/odata/GetProductById', { params: { id: currentProductID } });
            }
        },

        //Add Product Data. 
        AddProduct: function (data) {
            var defer = $q.defer();
            $http({
                url: '/Product/odata/Create',
                method: "POST",
                data: data
            }).success(function (d) {
                //Callback after success
                defer.resolve(d);
            }).error(function (e) {
                //callback after failed
                alert("Error");
                window.location.href = '/Product/odata/Create';
                defer.reject(e);
            });
            return defer.promise;
        }, //End of Add Product Data

        //Delete Product Data.
        DelProductData: function (productid) {
            var defer = $q.defer();  
            $http({
                url: '/Product/odata/Delete/' + productid,
                method: 'POST'
            }).success(function (d) {
                alert("the Product deleted successfully");
                defer.resolve(d);
            }).error(function (e) {
                alert("Error");
                defer.reject(e);
            });
            return defer.promise;

        },

        //Update Product Data. 
        UpdateProductData: function (product) {
            var defer = $q.defer();
            product.Id = this.GetProductId();
            $http({
                url: '/Product/odata/Update',
                method: 'POST',
                data: Product
            }).success(function (d) {
                defer.resolve(d);
                window.location.href = '/Product/Index';
            }).error(function (e) {
                alert("Error");
                defer.reject(e);
            });
            return defer.promise;
        },
    }
});


