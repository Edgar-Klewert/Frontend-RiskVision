import { Container } from '@/components/atoms/container';
import { Link } from '@/components/atoms/link';
import { PAGES } from '@/enums/pages.enum';

export default function Home() {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-zinc-900 text-white'>
      <Container>
        <h1 className='text-2xl font-bold'>To Do:</h1>
        <ul className='list-disc'>
          <li>Página de Esqueceu a Senha</li>
          <li>
            Implementar funções genéricas para a requisição de esqueceu a senha
          </li>
          <li>Página de Registro &#40; sprint 2 &#41;</li>
          <li>
            Implementar funções genéricas para a requisição de cadastro &#40;
            sprint 2 &#41;
          </li>
        </ul>

        <h2 className='text-2xl font-bold'>Done:</h2>
        <ul className='list-disc'>
          <li>
            <Link href={`${PAGES.LOGIN}`}>Página de Login</Link>
          </li>
          <li>Implementar funções genéricas para a requisição de login</li>
        </ul>
      </Container>
    </div>
  );
}
