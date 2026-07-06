import { useState } from "react";
import { Package, ChartColumn, ShieldCheck, UserRound, LockKeyhole, Eye, EyeOff, Lock, LockOpen, CircleAlert } from "lucide-react";
import icon from "../../assets/icons/Icon.png"
import { FeatureCard } from "../../components/FeatureCard/FeatureCard";
import { login } from "../../api/auth";
import { useNavigate } from "react-router-dom";

export function Login() {
    const [ mostrarSenha, setMostrarSenha ] = useState(false)
    const [ user, setUser ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ error, setError ] = useState("")
    const [ loading, setLoading ] = useState(false)
    const navigate = useNavigate()

    const toggleSenhaVisivel = (e: React.MouseEvent) => {
    e.preventDefault()
    setMostrarSenha(!mostrarSenha)
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    setError("")
    setLoading(true)

    try {
      const response = await login(user, password)
      
      localStorage.setItem("access", response.data.access)
      localStorage.setItem("refresh", response.data.refresh)
      
      navigate("/dashboard")
    } catch {
      setError("Usuário ou Senha inválidos")
      setPassword("")
    } finally {
      setLoading(false)
    }

  }

  return (
    <main className="flex min-h-screen bg-gray-100">
      <section
        className="
          w-154 px-24 py-16
          bg-linear-to-br from-neutral-400 via-neutral-500 to-neutral-700
          shadow-2xl
          flex flex-col
          relative overflow-hidden
        "
      >
        <div
          className="
            absolute
            top-30 right-30
            w-96 h-96
            rounded-full
            bg-white/20 blur-3xl
          "
        />
        <div
          className="
            absolute
            bottom-35 right-25
            w-96 h-96
            rounded-full
            bg-black/20 blur-3xl
          "
        />
        <div
          className="
            absolute
            left-20 top-1/2
            w-72 h-72
            rounded-full
            bg-white/10 blur-3xl
          "
        />
        <div className="relative z-10 h-full text-white flex flex-col justify-between items-center">
          <div className="flex gap-2 items-center">
            <img src={icon} alt="" className="w-18" />
            <div>
              <p className="text-4xl font-bold">Claud<span className="text-black">Stock</span></p>
              <p className="text-base">Estoque de Cosméticos</p>
            </div>
          </div>
          <div className="flex flex-col gap-12">
            <p className="text-4xl font-bold">Contole seu estoque de forma
              <span className="text-black"> simples </span>
              e
              <span className="text-black"> eficiente</span>
              .
            </p>
            <p className="text-base">
              Gerencie seus produtos, categorias e mantenha tudo organizado em um só lugar
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <FeatureCard
              icon={Package}
              title="Organização"
              description="Mantenha seus produtos e categorias sempre organizados."
            />
            <FeatureCard
              icon={ChartColumn}
              title="Relatórios"
              description="Acompanhe o desempenho do seu estoque em tempo real."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Segurança"
              description="Seus dados protegidos com segurança e privacidade."
            />
          </div>
          <p className="text-sm">&copy; ClaudStock. Todos os direitos reservados.</p>
        </div>
      </section>
      <section className="w-full h-screen flex flex-col gap-6 items-center justify-center">
        <form
          className="p-12 bg-white flex gap-10 flex-col justify-center rounded-xl shadow-2xl"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col items-center">
            <img src={icon} alt="Icone CloudStock" className="w-34" />
            <p className="text-4xl font-bold">Bem-vindo de volta!</p>
            <p className="text-base">Faça login para acessar sua conta</p>
          </div>
          <div
            className="flex flex-col gap-6 w-2xl"
          >
            <div className="flex flex-col gap-2">
              <label className="text-2xl font-bold">Usuário</label>
              <label
                htmlFor="username"
                className="
                  px-6 flex items-center rounded-xl
                  border-2 border-gray-300
                  focus-within:border-gray-600
                  cursor-text
                "
              >
                <UserRound size={24} />
                <input
                  id="username"
                  className="h-16 px-4 text-base w-full outline-none placeholder:text-sm"
                  type="text"
                  placeholder="Digite seu usuário"
                  autoComplete="username"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                />
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-2xl font-bold">Senha</label>
              <label
                htmlFor="password"
                className="
                  px-6 flex items-center rounded-xl
                  border-2 border-gray-300
                  focus-within:border-gray-600
                  cursor-text
                "
              >
                <LockKeyhole size={24} />
                <input
                  id="password"
                  className="h-16 px-4 text-base w-full outline-none placeholder:text-sm"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite a sua senha"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={toggleSenhaVisivel}
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  className="
                    p-1 cursor-pointer
                    text-gray-500 hover:text-black
                    transition-colors duration-300 ease-in-out
                  "
                >
                  {mostrarSenha ? <Eye size={24} /> : <EyeOff size={24} />}
                </button>
              </label>
            </div>
            {error && (
              <div
                className="
                  rounded-xl border border-red-300 bg-red-50 p-4
                  flex gap-4 items-center
                "
              >
                <CircleAlert size={24} className="text-red-600" />
                <p className="text-sm text-red-600">
                  {error}
                </p>
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="
              h-16 text-2xl font-bold p-4
              bg-black text-white
              flex gap-4 justify-center items-center rounded-xl
              hover:border-2 hover:border-gray-400 hover:scale-[1.02] active:scale-[1.0]
              transition-all hover:duration-300 active:duration-0 ease-in-out
              cursor-pointer
              disabled:cursor-not-allowed disabled:opacity-50
            "
          >
            {loading? <LockOpen size={24} />  : <Lock size={24} />}
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <footer className="text-xs text-gray-400">Versão 1.0.0</footer>
      </section>
    </main>
  );
}