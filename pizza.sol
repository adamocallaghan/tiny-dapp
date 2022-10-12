//SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.7;

contract Pizza {
    string internal pizza = "Pepperoni";

    function getPizza() external view returns(string memory) {
        return pizza;
    }

    function setPizza(string memory _yourFavouritePizza) external {
        pizza = _yourFavouritePizza;
    }
}