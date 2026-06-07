package com.primer.projekat.service;

import com.primer.projekat.model.Category;
import com.primer.projekat.model.Item;
import com.primer.projekat.repository.CategoryRepository;
import com.primer.projekat.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepository itemRepository;
    private final CategoryRepository categoryRepository;

    public List<Item> getAll() {
        return itemRepository.findAll();
    }

    public Item getById(Long id) {
        return itemRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Artikal nije pronađen: " + id));
    }

    public Item create(Item item, Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new RuntimeException("Kategorija nije pronađena"));
        item.setCategory(category);
        return itemRepository.save(item);
    }

    public Item update(Long id, Item updated, Long categoryId) {
        Item existing = getById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setPrice(updated.getPrice());
        existing.setStock(updated.getStock());
        if (categoryId != null) {
            Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Kategorija nije pronađena"));
            existing.setCategory(category);
        }
        return itemRepository.save(existing);
    }

    public void delete(Long id) {
        if (!itemRepository.existsById(id)) {
            throw new RuntimeException("Artikal nije pronađen: " + id);
        }
        itemRepository.deleteById(id);
    }
}
