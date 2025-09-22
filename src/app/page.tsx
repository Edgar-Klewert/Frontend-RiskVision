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
          <li>
            Wireframe da Landing Page &#40; Página inicial com informações sobre
            o sistema &#41;
          </li>
          <li>Landing Page (Página inicial com informações sobre o sistema)</li>
        </ul>

        <h2 className='text-2xl font-bold'>Done:</h2>
        <div className='flex gap-3'>
          <div className='flex max-w-sm flex-col gap-2 text-balance'>
            <h3 className='text-lg font-bold'>
              Sprint 1 - Configurações Iniciais e Design das Páginas Básicas
            </h3>
            <ul className='list-disc'>
              <li>
                Wireframe das páginas de Login, Registro e Esqueceu a Senha
              </li>
              <li>
                Configurações iniciais do projeto &#40;definição de estilos
                customizáveis, componentes, CI/CD, entre outras configs.&#41;
              </li>
              <li>
                <Link href={`${PAGES.LOGIN}`}>Página de Login</Link>
              </li>
              <li>Implementar funções genéricas para a requisição de login</li>
            </ul>
          </div>
          <div className='flex max-w-sm flex-col gap-2 text-balance'>
            <h3 className='text-lg font-bold'>
              Sprint 2 - Autenticação de Usuário e Páginas de Registro e
              Esqueceu a Senha
            </h3>
            <ul className='list-disc'>
              <li>
                <Link href={`${PAGES.REGISTER}`}>Página de Registro</Link>
              </li>
              <li>
                Implementar funções genéricas para a requisição de cadastro
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
