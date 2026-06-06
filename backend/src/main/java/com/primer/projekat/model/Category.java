package com.primer.projekat.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "categories")
@Data @NoArgsConstructor @AllArgsConstructor
public class Category {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    private String description;

    // OneToMany: jedna kategorija ima više artikala
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
    @JsonIgnore  // izbegava beskonačnu rekurziju
    private List<Item> items = new ArrayList<>();
}
