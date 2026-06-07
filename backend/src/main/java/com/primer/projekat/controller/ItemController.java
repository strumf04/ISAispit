package main.java.com.primer.projekat.controller;

import com.primer.projekat.config.JwtUtils;
import com.primer.projekat.dto.*;
import com.primer.projekat.model.Role;
import com.primer.projekat.model.User;
import com.primer.projekat.repository.RoleRepository;
import com.primer.projekat.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    public ResponseEntity<List<Item>> getAll() {
        return ResponseEntity.ok(itemService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Item> getById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Item> create(
            @RequestBody Item item,
            @RequestParam Long categoryId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                             .body(itemService.create(item, categoryId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Item> update(
            @PathVariable Long id,
            @RequestBody Item item,
            @RequestParam(required = false) Long categoryId) {
        return ResponseEntity.ok(itemService.update(id, item, categoryId));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        itemService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
