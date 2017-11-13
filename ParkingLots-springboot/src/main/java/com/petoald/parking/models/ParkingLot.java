package com.petoald.parking.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name = "parking_lot")
public class ParkingLot {
    @Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String location;
    private int capacity;
    private double parkeerkosten;

    @OneToMany(mappedBy = "parkingLot", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("parkingLot")
    private Set<Car> cars;

    public ParkingLot() {
    }

    public ParkingLot(int id, String location, int capacity, double parkeerkosten, Set<Car> cars) {
        this.id = id;
        this.location = location;
        this.capacity = capacity;
        this.parkeerkosten = parkeerkosten;
        this.cars = cars;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public double getParkeerkosten() {
        return parkeerkosten;
    }

    public void setParkeerkosten(double parkeerkosten) {
        this.parkeerkosten = parkeerkosten;
    }

    public Set<Car> getCars() {
        return cars;
    }

    public void setCars(Set<Car> cars) {
        this.cars = cars;
    }

    @Override
    public String toString() {
        return "ParkingLot{" +
                "id=" + id +
                ", location='" + location + '\'' +
                ", capacity=" + capacity +
                '}';
    }
}
