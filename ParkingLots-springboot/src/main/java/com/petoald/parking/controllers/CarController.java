package com.petoald.parking.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.util.List;

import com.petoald.parking.models.*;
import com.petoald.parking.services.*;

@Controller
public class CarController {

    @Autowired  private CarService carService;

    @ResponseBody
    @RequestMapping(value = "api/new/car", method = RequestMethod.POST)
    public int create(@RequestBody Car car) {
        return carService.save(car).getId();
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "api/car/{id}", method = RequestMethod.DELETE)
    public void removeCar(@PathVariable  int id) {
        carService.delete(id);
    }

    @ResponseBody
    @RequestMapping(value = "/api/car/all", method = RequestMethod.GET)
    public List<Car> findAll() {
        return (List<Car>)carService.findAll();
    }

    @ResponseBody
    @RequestMapping(value = "/api/car/{id}", method = RequestMethod.GET)
    public Car carById(@PathVariable  int id) {
        return carService.findOne(id);
    }

    @ResponseBody
    @RequestMapping(value = "/api/cardetail/{licensePlate}", method = RequestMethod.GET)
    public List<Car> carByLicensePlate(@PathVariable String licensePlate) {
        return carService.findByLicensePlate(licensePlate);
    }

//    @ResponseBody
//    @RequestMapping(value = "/api/car/update", method = RequestMethod.PUT)
//    public int updateCar() {
//        Car currentCar = carService.findOne(id);
//
//        if(car.getLicensePlate() != "") currentCar.setLicensePlate(car.getLicensePlate());
//        currentCar.setColour(car.getColour());
//        currentCar.setParkingLot(car.getParkingLot());
//
//        return carService.save(currentCar).getId();
//    }


    @ResponseBody
    @RequestMapping(value = "api/update/car", method = RequestMethod.POST)
    public int updateCar(@RequestBody Car newCar) {
        Car old = carService.findOne(newCar.getId());
        newCar.setColour(old.getColour());
        newCar.setLicensePlate(old.getLicensePlate());

        return carService.save(newCar).getId();
    }

}
