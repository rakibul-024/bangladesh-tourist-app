"use client";
import {useMemo,useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import {Search,MapPin,Star,ArrowRight,Compass} from "lucide-react";
import spots from "@/data/spots.json";
import type {Spot} from "@/types/spot";

const categories=["All","Beach","Hill","Forest","Historical","Waterfall","Lake"];

export default function HomePage(){
 const [search,setSearch]=useState(""); const [category,setCategory]=useState("All");
 const filtered=useMemo(()=> (spots as Spot[]).filter(s=>{
   const q=search.toLowerCase().trim();
   return (!q||s.name.toLowerCase().includes(q)||s.district.toLowerCase().includes(q))
    &&(category==="All"||s.category.toLowerCase()===category.toLowerCase());
 }),[search,category]);
 return <main className="min-h-screen bg-slate-950 text-white">
  <section className="relative overflow-hidden"><div className="absolute inset-0">
   <Image src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85" alt="Bangladesh" fill priority className="object-cover"/>
   <div className="absolute inset-0 bg-slate-950/70"/>
   <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950"/>
  </div>
  <div className="relative mx-auto flex min-h-[680px] max-w-7xl flex-col items-center justify-center px-5 text-center">
   <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}>
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm"><Compass size={16}/>Discover Bangladesh</div>
    <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl">Explore the <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Beauty of Bangladesh</span></h1>
    <p className="mx-auto mt-6 max-w-2xl text-slate-300 sm:text-lg">Discover beaches, hills, forests, historical places and hidden gems across Bangladesh.</p>
   </motion.div>
   <div className="mt-10 w-full max-w-2xl"><div className="flex items-center rounded-2xl border border-white/20 bg-white/10 p-2 backdrop-blur-xl">
    <Search size={21} className="ml-3 text-slate-300"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by spot or district..." className="w-full bg-transparent px-4 py-3 text-white outline-none placeholder:text-slate-400"/>
    <button onClick={()=>document.getElementById("explore")?.scrollIntoView({behavior:"smooth"})} className="hidden rounded-xl bg-emerald-500 px-5 py-3 font-medium sm:block">Explore</button>
   </div></div>
   <div className="mt-8 flex flex-wrap justify-center gap-2">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`rounded-full border px-4 py-2 text-sm ${category===c?"border-emerald-400 bg-emerald-500":"border-white/20 bg-white/10 text-slate-300"}`}>{c}</button>)}</div>
  </div></section>
  <section id="explore" className="mx-auto max-w-7xl px-5 py-20"><div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
   <div><p className="text-sm uppercase tracking-widest text-emerald-400">Explore</p><h2 className="mt-2 text-3xl font-bold">Places worth visiting</h2><p className="mt-3 text-slate-400">Find your next destination.</p></div><div className="text-sm text-slate-400">{filtered.length} destinations found</div>
  </div>
  {filtered.length===0?<div className="flex min-h-[300px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-center"><Search size={45} className="mb-4 text-slate-500"/><h3 className="text-xl font-semibold">No destinations found</h3><p className="mt-2 text-slate-400">Try another search or category.</p><button onClick={()=>{setSearch("");setCategory("All")}} className="mt-5 rounded-xl bg-emerald-500 px-5 py-2.5">Clear filters</button></div>:
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">{filtered.map((s,i)=><motion.article key={s.id} initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{delay:i*.04}} whileHover={{y:-6}} className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[.04]">
   <div className="relative h-64 overflow-hidden"><Image src={s.image} alt={s.name} fill className="object-cover transition duration-700 group-hover:scale-110"/><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/><span className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1.5 text-xs">{s.category}</span><div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1.5 text-sm"><Star size={15} className="fill-yellow-400 text-yellow-400"/>{s.rating}</div></div>
   <div className="p-5"><div className="flex items-center gap-2 text-sm text-emerald-400"><MapPin size={15}/>{s.district}</div><h3 className="mt-2 text-xl font-bold">{s.name}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-400">{s.specialty}</p><Link href={`/spots/${s.id}`} className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm hover:bg-emerald-500">View Details<ArrowRight size={17}/></Link></div>
  </motion.article>)}</div>}
  </section></main>
}