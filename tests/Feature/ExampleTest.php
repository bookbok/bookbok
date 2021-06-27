<?php

namespace Tests\Feature;

use App\Services\Webpack;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        // バンドルを参照する場合はこのようにしてビルドせずとも実行できるようにスタブを置く
        $webpack = $this->createMock(Webpack::class);
        $webpack->method('get')->willReturn('dummy');
        $this->instance(Webpack::class, $webpack);
    }

    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
