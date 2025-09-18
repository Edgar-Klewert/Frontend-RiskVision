export default function Home() {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center gap-5 bg-zinc-900 text-white'>
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
    </div>
  );
}
