package MyPortfolio.Service;

import MyPortfolio.Entity.User;
import MyPortfolio.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{

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
        return userRepository.findById(id).get();
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
}
