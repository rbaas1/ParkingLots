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
    public void updateCar(@PathVariable  int id) {
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
    public List<Car> carByLicensePlate(@PathVariable  String licensePlate) {
        return carService.findByLicensePlate(licensePlate);
    }

}
