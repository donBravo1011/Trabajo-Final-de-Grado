package MyPortfolio.Controller;

import MyPortfolio.Entity.User;
import MyPortfolio.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping("/register")
    public User register(@RequestBody User user){
        return userService.register(user);
    }

    @PostMapping("/login")
    public Boolean login(@RequestParam String email,@RequestParam String password){
        return userService.login(email,password);
    }

    @GetMapping("/{id}")
    public User get(@PathVariable Long id){
        return userService.getById(id);
    }

    @PutMapping
    public User update(@RequestBody User user){
        return userService.update(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        userService.delete(id);
    }


}
