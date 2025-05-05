package MyPortfolio.Services;

import MyPortfolio.Entities.User;
import MyPortfolio.Exceptions.ResourceNotFoundException;
import MyPortfolio.Repositories.UserRepository;
import MyPortfolio.Services.Impl.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User register(User user) {
        return userRepository.save(user);
    }

    @Override
    public Boolean login(String email,String password) {
        List<User> list = userRepository.findAll();
        for(User user: list){
            if(Objects.equals(user.getEmail(), email)){
                return Objects.equals(user.getPassword(), password);
            }
        }
        return false;
    }

    @Override
    public User getById(Long id) {
        return userRepository.findById(id).orElseThrow(
                () -> {
                    throw new ResourceNotFoundException();
                }
        );
    }

    @Override
    public User update(User user) {
        User userDb = userRepository.findById(user.getId()).get();

        userDb.setEmail(user.getEmail());
        userDb.setNombre(user.getNombre());
        userDb.setPassword(user.getPassword());

        return userRepository.save(userDb);
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User updateName(String name, Long id){
        User userDb = userRepository.findById(id).get();
        userDb.setNombre(name);
        return userRepository.save(userDb);
    }

    @Override
    public User updatePassword(String pw, Long id){
        User userDb = userRepository.findById(id).get();
        userDb.setPassword(pw);
        return userRepository.save(userDb);
    }
}
