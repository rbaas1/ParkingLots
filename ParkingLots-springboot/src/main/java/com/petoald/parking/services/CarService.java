package com.petoald.parking.services;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.petoald.parking.models.*;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface CarService extends CrudRepository<Car, Integer> {

    List<Car> findByLicensePlate(String licensePlate);

}

