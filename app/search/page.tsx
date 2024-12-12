"use client"

import Container from '@/components/layout/container'
import React from 'react'
import { Feather } from 'lucide-react'
import { advancedSearchSchema } from '@/schemas/search'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SeasonConstant, FormatConstant, SortConstant, StatusConstant, convertQueryArrayParams, getAnimeTitle } from '@/utils/constant'
import { useEffect } from 'react'
import { useMutation } from '@tanstack/react-query'
import { searchAdvanced } from '@/data/anime'
import { SkeletonCards } from '@/components/loading/skeleton'
import { AnimeCard } from '@/components/anime'
import { Label } from '@/components/ui/label'
import { Genres } from '@/utils/constant'
import { Check } from 'lucide-react'

export default function Page() {
  const { mutate, isPending, isError, data } = useMutation({
    mutationKey: ["search"],
    mutationFn: searchAdvanced,
  })
  const [query, setQuery] = React.useState<string>("");
  const [array, setArray] = React.useState<string[]>([]);
  const form = useForm<z.infer<typeof advancedSearchSchema>>({
    resolver: zodResolver(advancedSearchSchema),
    defaultValues: {
      // query: "",
      season: "SUMMER",
      format: "TV",
      sort: "POPULARITY_DESC",
      status: "FINISHED",
    },
  });


  // Lấy giá trị thay đổi trong form
  // const { watch } = form;

  // // Lắng nghe sự thay đổi
  // const formValues = watch();

  // useEffect(() => {
  //   console.log("Form values changed:", formValues);
  //   // Gửi giá trị hoặc thực hiện hành động tự động

  // }, [formValues]);
  useEffect(() => {
    mutate({
      season: "SUMMER",
      format: "TV",
      sort: convertQueryArrayParams(["POPULARITY_DESC"]),
      status: "FINISHED",
      perPage: 1000,
    });
  }, []);

  function onSubmit(values: z.infer<typeof advancedSearchSchema>) {
    // console.log(values);
    /* eslint-disable */
    values.sort = convertQueryArrayParams([values.sort as string]) as any;
    if (array.length)
      /* eslint-disable */
      mutate({
        ...values,
        perPage: 1000,
        genres: convertQueryArrayParams(array)
      } as any);
    else
      /* eslint-disable */
      mutate({
        ...values,
        perPage: 1000,
      } as any);
  }

  return (
    <div className="w-full mt-[100px]">
      <Container title="Advanced search" icon={Feather}>
        {/* <div className='flex justify-center flex-col items-center'> */}
        <div className="flex flex-col gap-3">
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-wrap gap-5 items-center"
              >
                {/* Query Input */}
                {/* <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>SEARCH</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter query" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                <div className='space-y-2'>
                  <Label className='font-bold'>QUERY</Label>
                  <Input
                    placeholder="Enter title"
                    className="w-[180px]"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                {/* Season Select */}
                <FormField
                  control={form.control}
                  name="season"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>SEASON</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Season" />
                        </SelectTrigger>
                        <SelectContent>
                          {SeasonConstant.map((item, index) => (
                            <SelectItem key={index} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Format Select */}
                <FormField
                  control={form.control}
                  name="format"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>FORMAT</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Format" />
                        </SelectTrigger>
                        <SelectContent>
                          {FormatConstant.map((item, index) => (
                            <SelectItem key={index} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Status Select */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>STATUS</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {StatusConstant.map((item, index) => (
                            <SelectItem key={index} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Sort Multi-Select */}
                <FormField
                  control={form.control}
                  name="sort"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='font-bold'>SORT</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select Sort Options" />
                        </SelectTrigger>
                        <SelectContent>
                          {SortConstant.map((item, index) => (
                            <SelectItem key={index} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className='mt-8'>Submit</Button>
              </form>
            </Form>
          </div>
          <div className='flex items-center gap-3 overflow-scroll'>
            {
              Genres.map((genre, index) => (
                <div key={index} className='space-y-2'>
                  <Button className='font-bold' variant={"secondary"} onClick={() => array.includes(genre.value) ? setArray((prev) =>
                    prev.filter((el) => el !== genre.value)
                  ) : setArray((prev) => [...prev, genre.value]
                  )} >{genre.label} {array.includes(genre.value) ? <Check size={20} className='ml-2' /> : null}</Button>
                </div>
              ))
            }
          </div>
        </div>
        {isPending && <SkeletonCards />}
        {isError && <div className='m-7'>Đã xãy ra lỗi</div>}
        <div className='flex items-center gap-5 justify-center flex-wrap'>
          {
            data?.filter((el) => getAnimeTitle(el.title)?.toLowerCase().includes(query.toLowerCase())).map((anime) => (
              <AnimeCard
                key={anime.id}
                id={anime.id}
                title={getAnimeTitle(anime.title) || ""}
                image={anime.image}
                type={anime.type}
              />
            ))
          }
        </div>
        {/* </div> */}
      </Container>
    </div>
  );
}