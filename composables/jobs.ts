import { Job } from "~~/utils/timeline";

export async function useJobs() {
    let jobs = ref<Job[]>();
    
    const { data } = await useAsyncData("jobs", () =>
        queryContent("/jobs").findOne()
    );
    
    jobs = data.value!.body.map((elt: Job) => elt);    

    return jobs;
}


