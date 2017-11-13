package com.petoald.parking.controllers;

import com.petoald.parking.models.ParkingLot;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.petoald.parking.services.ParkingLotService;

import java.util.List;

@Controller
public class ParkingLotController {
    @Autowired
    private ParkingLotService parkingLotService;

    @ResponseBody
    @RequestMapping(value = "api/new/parkinglot", method = RequestMethod.POST)
    public int create(@RequestBody ParkingLot parkingLot) {
        return parkingLotService.save(parkingLot).getId();
    }

    @ResponseStatus(value = HttpStatus.OK)
    @RequestMapping(value = "api/parkinglot/{id}", method = RequestMethod.DELETE)
    public void updateParkingLot(@PathVariable  int id) {
        parkingLotService.delete(id);
    }

    @ResponseBody
    @RequestMapping(value = "/api/parkinglot/all", method = RequestMethod.GET)
    public List<ParkingLot> findAll() {
        return (List<ParkingLot>)parkingLotService.findAll();
    }

    @ResponseBody
    @RequestMapping(value = "/api/parkinglot/{id}", method = RequestMethod.GET)
    public ParkingLot carById(@PathVariable  int id) {
        return parkingLotService.findOne(id);
    }

    @ResponseBody
    @RequestMapping(value = "/api/parkinglotdetail/{location}", method = RequestMethod.GET)
    public List<ParkingLot> parkkingLotByLocation(@PathVariable  String location) {
        return parkingLotService.findByLocation(location);
    }


}
