package com.petoald.parking.services;

import com.petoald.parking.models.Car;
import com.petoald.parking.models.ParkingLot;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface ParkingLotService extends CrudRepository<ParkingLot, Integer> {

    List<ParkingLot> findByLocation(String location);

}
