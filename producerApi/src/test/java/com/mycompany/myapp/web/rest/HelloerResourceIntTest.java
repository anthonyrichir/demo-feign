package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.ProducerApiApp;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
/**
 * Test class for the Helloer REST controller.
 *
 * @see HelloerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProducerApiApp.class)
public class HelloerResourceIntTest {

    private MockMvc restMockMvc;

    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);

        HelloerResource helloerResource = new HelloerResource();
        restMockMvc = MockMvcBuilders
            .standaloneSetup(helloerResource)
            .build();
    }

    /**
    * Test getHello
    */
    @Test
    public void testGetHello() throws Exception {
        restMockMvc.perform(get("/api/helloer/get-hello"))
            .andExpect(status().isOk());
    }

}
