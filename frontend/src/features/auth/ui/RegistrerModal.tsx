import { useForm } from 'react-hook-form';
import { RegisterForm, registerSchema } from '../model/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { register } from '../api/register';

interface Props {
  open: boolean;
  onClose: () => void;
}

function RegisterModal({ open, onClose }: Props) {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  if (!open) return null;

  const onSubmit = async (data: RegisterForm) => {
    await register(data.email, data.password);
    onClose();
  };

  return (
    <div style={overlay}>
      <form style={modal} onSubmit={handleSubmit(onSubmit)}>
        <h3>Register</h3>
        <input type="text" placeholder="Email" {...formRegister('email')} />
        {errors.email && <p>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Password"
          {...formRegister('password')}
        />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

const overlay = {
  position: 'fixed' as const,
  inset: 0,
  background: 'rgba(0,0,0,0.4)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const modal = {
  background: 'white',
  padding: 20,
  borderRadius: 8,
  width: 300,
};

export default RegisterModal;
